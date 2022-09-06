import { View, Text, StyleSheet, TextInput, Image, ScrollView, Button } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import DocumentPickerHandle from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";
import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { ListPeopleContext } from '../../context/ListPeopleContext';

const selectImage = async (setImage: React.Dispatch<React.SetStateAction<string[]>>) => {
  try {
    const responseImage = await DocumentPickerHandle.pickSingle({
      type: [DocumentPickerHandle.types.images]
    });
    const imageBase64 = await RNFetchBlob.fs.readFile(responseImage.uri, 'base64');
    setImage((prev) => ([...prev, imageBase64]));
  } catch (err) {
    console.log('cancel', err);
  }
};

const initForm = {authorize: false, edad: 0, name: "", id: 0, images: [] as string[]};

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataUser, setDataUser] = useState(initForm);
  const [listImage, setListImage] = useState<string[]>([]);
  const [optionsPreviewImage, setOptionsPreviewImage] = useState({visible: false, position: 0});
  const { setListPeople, listPeople } =  React.useContext(ListPeopleContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerShown: false
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  React.useEffect(() => {
    searchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route?.params.id]);

  React.useEffect(() => {
    setConfigScreen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser.name]);

  const searchUser = () => {
    const { id, authorize } = props.route?.params;
    let userFinded = listPeople.find((item) => item.id === id) || initForm;
    if (userFinded.id === 0) {
      userFinded.authorize = authorize;
    }
    if (userFinded.images.length !== 0) {
      setListImage(userFinded.images);
    }
    setDataUser(() => ({ ...userFinded }));
  };

  const setConfigScreen = () => {
    const { editMode } = props.route?.params;
    props.navigation.setOptions({
      title: editMode ? dataUser.name : 'Nueva persona',
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

  const onSaveForm = () => {
    const { editMode } = props.route?.params;
    editMode ? saveModeEdit() : saveModeCreate();
    props.navigation.goBack();
  };

  const saveModeCreate = () =>
    setListPeople((prev:any) => ([...prev, {...dataUser, images: listImage}]));

  const saveModeEdit = () => {
    const findIndex = listPeople.findIndex((item) => item.id === dataUser.id);
    if (findIndex !== -1) {
      listPeople[findIndex] = { ...dataUser, images: listImage };
      setListPeople(() => ([...listPeople]));
    }
  };

  const onChange = (newValue:object) => setDataUser((prev) => ({...prev, ...newValue}));

  return (
    <ScrollView style={styles.view}>
      <Text>Detalle y datos personales</Text>
      <View style={styles.groupInput}>
        <Text>Nombre y apellidos</Text>
        <TextInput value={dataUser.name} onChangeText={(value) => onChange({name: value})}/>
      </View>
      <View style={styles.groupInput}>
        <Text>Edad</Text>
        <TextInput value={dataUser.edad + ""} onChangeText={(value) => onChange({edad: value})}/>
      </View>
      <View style={styles.groupInput}>
        <Text>Autorizado</Text>
        <TextInput value={dataUser.authorize ? 'Autorizado' : 'No Autorizado'} />
      </View>
      <Text>Fotos relacionadas a la persona</Text>

      {
        listImage.length !== 0 ? (
        <View style={styles.listImage}>
          {
            listImage.map((item, position) =>
            <View key={position} style={styles.itemImage}>
              <Ionicons onPress={() => onDeleteImageForIndex(position)} name="close-circle" size={50} style={styles.icon} color="#ff9900"/>
              <TouchableOpacity onPress={() => setOptionsPreviewImage({visible: true, position})}>
                <Image source={{uri: 'data:image/jpeg;base64,' + item}} style={styles.image} />
              </TouchableOpacity>
            </View>
            )
          }
          <ImageView
            images={listImage.map((item) => ({uri: 'data:image/jpeg;base64,' + item}))}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 30,
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
    marginVertical: 15
  }
});
