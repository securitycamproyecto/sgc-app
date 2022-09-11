import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, Button, Alert } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { launchCamera, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";
import services from '../../services/api';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import awsConfig from '../../../awsConfig';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

const selectImage = async (setImage: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const options: ImageLibraryOptions = {
      mediaType: 'photo'
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }else {
        console.log('User selected a file form camera or gallery', response); 
        const assets = response.assets;
        const images: any = [];
        for (const asset of assets) {
          images.push({ uri: asset.uri, name: asset.fileName, type: asset.type });
        }
        setImage((prev: any) => ([...prev, ...images]));
      }
    });
  } catch (err) {
    console.log('cancel', err);
  }
};

const initForm = { authorized: false, age: "", names: "", id: null };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataUser, setDataUser] = useState({...initForm, images: [], authorized: props.route?.params.authorized});
  const [listImage, setListImage] = useState<any[]>([]);
  const [optionsPreviewImage, setOptionsPreviewImage] = useState({visible: false, position: 0});
  const isFocused = useIsFocused();

  const setConfigScreen = () => {
    const { editMode } = props.route?.params;
    props.navigation.setOptions({
      title: editMode ? dataUser.names : 'Nueva persona',
      headerRight: () => (
        <TouchableOpacity onPress={() => selectImage(setListImage)} >
          <Ionicons name="camera" size={35} color="#333"/>
        </TouchableOpacity>
      )
    });
  };

  const onDeleteImageForIndex = (position:number) => {
    setListImage(() => ([
      ...listImage.filter((_, index) => index !== position)
    ]));
  };

  const onChange = (newValue:object) => setDataUser((prev) => ({...prev, ...newValue}));

  const saveModeCreate = async () => {
    const result: any = await services.setPeople(null, {
      names: dataUser.names,
      age: dataUser.age,
      authorized: +dataUser.authorized + "",
      clientId: "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2"
    });
    console.log('===result===', result);
    for (const image of listImage) {
      if (image.uri)
        await services.setFaces({
          "image": image,
          "peopleId": result.data.uuid,
          "clientId": "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2",
          "collection": "MyCollection",
          "bucket": "myrekognitioncollections"
        });
    }
    Alert.alert('Persona registrada');
  }

  const saveModeEdit = async () => {
    await services.setPeople(dataUser.id, {
      names: dataUser.names,
      age: dataUser.age,
      authorized: +dataUser.authorized + "",
      clientId: "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2"
    });
    for (const image of listImage) {
      if (image.uri)
        await services.setFaces({
          "image": image,
          "peopleId": dataUser.id,
          "clientId": "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2",
          "collection": "MyCollection",
          "bucket": "myrekognitioncollections"
        });
    }
    Alert.alert('Persona actualizada');
  };

  const onSaveForm = async () => {
    const { editMode } = props.route?.params;
    try {
      editMode ? await saveModeEdit() : await saveModeCreate();
      props.navigation.goBack();
    } catch (err) {
      Alert.alert('Hubo un error al guardar');
    }
  };

  React.useEffect(() => {
    const load = async () => {
      const { data } = props.route?.params;
      if (data) {
        setDataUser({
          id: data.id.S,
          names: data.names.S,
          age: data.age.S,
          authorized: data.authorized.S,
          images: []
        });
        const images: any = await services.getFaces(data.id.S);
        const s3 = new S3Client({region: awsConfig.region, credentials: await Auth.currentCredentials()});
        const newListImages: any = [];
        console.log(images);
        for (const image of images.data) {
          console.log(image);
          const command = new GetObjectCommand({Bucket: 'myrekognitioncollections', Key: image.name});
          const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60*60*24});
          newListImages.push({url: signedUrl});
        }
        setListImage(newListImages);
      }
    }
    if (isFocused) {
      setSettings({
        headerShown: false
      });
      load();
    }
  }, [isFocused]);

  React.useEffect(() => {
    setConfigScreen();
  }, [dataUser.names]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.view}>
        <View style={{paddingBottom: 30}}/>
        <Text style={{color: 'black', marginBottom: 20, fontWeight: '600'}}>Detalle y datos personales</Text>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Nombre y apellidos</Text>
          <TextInput placeholder='Ingrese nombres' value={dataUser.names} onChangeText={(value) => onChange({names: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Edad</Text>
          <TextInput placeholder='Ingrese edad' value={dataUser.age} onChangeText={(value) => onChange({age: value})}/>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={{color: 'black', fontWeight: '700'}}>{dataUser.authorized ? 'Autorizado' : 'No Autorizado'}</Text>
        </View>
        <Text style={{marginVertical: 10}}>Fotos relacionadas a la persona</Text>
        {
          listImage.length !== 0 ? (
            <View style={styles.listImage}>
              {
                listImage.map((item: any, position) =>
                <View key={position} style={styles.itemImage}>
                  <Ionicons onPress={() => onDeleteImageForIndex(position)} name="close-circle" size={50} style={styles.icon} color="#ff9900"/>
                  <TouchableOpacity onPress={() => setOptionsPreviewImage({visible: true, position})}>
                    <Image source={{uri: item?.uri || item.url}} style={styles.image} />
                  </TouchableOpacity>
                </View>
                )
              }
              <ImageView
                images={listImage.map((item: any) => ({uri: item?.uri || item.url}))}
                imageIndex={optionsPreviewImage.position}
                visible={optionsPreviewImage.visible}
                onRequestClose={() => setOptionsPreviewImage({visible: false, position: 0})}
              />
            </View>
          ) : (
            <View style={styles.empty}>
              <Ionicons name="file-tray-outline" size={35}/>
              <Text>Empty</Text>
            </View>
          )
        }
        <Button
          title="Guardar"
          color={'#ff9900'}
          onPress={onSaveForm}
          
        />
        <View style={{paddingTop: 30}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    flex: 1
  },
  groupInput: {
    borderBottomColor: '#333',
    borderBottomWidth: 0.3,
    marginVertical: 7
  },
  listImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  },
  itemImage: {
    width: 175
  },
  icon: {
    position: 'relative',
    top: 25,
    marginLeft: 'auto',
    zIndex: 1,
    elevation: 1
  },
  image: {
    height: 150,
    width: 150
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
  }
});
