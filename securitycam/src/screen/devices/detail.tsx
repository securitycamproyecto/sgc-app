import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

const initForm = { name: '', ubication: '', clientId: '', model: '', serie: '' };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataDevice, setDataDevice] = useState({...initForm});
  const isFocused = useIsFocused();

  const selectUser = () => {

  }

  const setConfigScreen = () => {
    const { editMode } = props.route?.params;
    props.navigation.setOptions({
      title: editMode ? dataDevice.name : 'Nuevo dispositivo'
    });
  };

  const onChange = (newValue:object) => setDataDevice((prev) => ({...prev, ...newValue}));

  const saveModeCreate = async () => {
    // const result: any = await services.setPeople(null, {
    //   names: dataDevice.names,
    //   age: dataDevice.age,
    //   authorized: +dataDevice.authorized + "",
    //   clientId: "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2"
    // });
    // Alert.alert('Persona registrada');
  }

  const saveModeEdit = async () => {
    // await services.setPeople(dataDevice.id, {
    //   names: dataDevice.names,
    //   age: dataDevice.age,
    //   authorized: +dataDevice.authorized + "",
    //   clientId: "68fdd0e1-7520-4fa4-969c-efe4f7cc31b2"
    // });
    // Alert.alert('Persona actualizada');
  };

  const isModelValid = () => {
    if (!dataDevice.name) return false;
    if (!dataDevice.ubication) return false;
    if (!dataDevice.clientId) return false;
    if (!dataDevice.model) return false;
    if (!dataDevice.serie) return false;
    return true;
  }

  const onSaveForm = async () => {
    const { editMode } = props.route?.params;
    if(!isModelValid()) {
      Alert.alert('Por favor, completar todos los campos');
      return;
    }
    try {
      editMode ? await saveModeEdit() : await saveModeCreate();
      props.navigation.goBack();
    } catch (err) {
      Alert.alert('Hubo un error al guardar');
    }
  };

  const onConfirmDelete = async () => {
    Alert.alert(
      "Security Cam",
      "¿Desea eliminar el dispositivo de la lista?",
      [
        {
          text: "No eliminar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sí", onPress: onDelete }
      ]
    )
  }

  const onDelete = async () => {
    // await services.removePeople(dataDevice.id);
    // Alert.alert('Persona eliminada');
    // props.navigation.goBack();
  }

  React.useEffect(() => {
    const load = async () => {
      const { data } = props.route?.params;
      console.log('===data===', data);
      if (data) {
        console.log('===data===', data);
        // setDataDevice({
        //   id: data.id.S,
        //   names: data.names.S,
        //   age: data.age.S,
        //   authorized: data.authorized.S,
        //   images: []
        // });
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
  }, [dataDevice.name]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.view}>
        <View style={{paddingBottom: 30}}/>
        <Text style={{color: 'black', marginBottom: 20, fontWeight: '600'}}>Detalle y datos personales</Text>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Nombre</Text>
          <TextInput placeholder='Ingrese nombre' value={dataDevice.name} onChangeText={(value) => onChange({name: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Ubicación</Text>
          <TextInput placeholder='Ingrese ubicación' value={dataDevice.ubication} onChangeText={(value) => onChange({ubication: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Cliente</Text>
          <TextInput placeholder='' value={dataDevice.clientId} onChangeText={(value) => onChange({clientId: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Modelo</Text>
          <TextInput placeholder='Ingrese modelo' value={dataDevice.model} onChangeText={(value) => onChange({model: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Serie</Text>
          <TextInput placeholder='Ingrese serie' value={dataDevice.serie} onChangeText={(value) => onChange({serie: value})}/>
        </View>
        <View style={{marginVertical: 20}}>
          <Button
            title="Guardar"
            color={'#ff9900'}
            onPress={onSaveForm}
          />
          {
            props.route?.params.editMode &&
            <TouchableOpacity
              style={{marginTop: 20, borderWidth: 1, borderColor: '#ff9900', width: '100%', alignItems: 'center', alignSelf: 'center', paddingVertical: 5}}
              onPress={onConfirmDelete}
            >
              <Text style={{color: '#ff9900', fontSize: 16}}>Eliminar</Text>
            </TouchableOpacity>
          }
        </View>
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
  },
  header: { height: 30, backgroundColor: '#fff' },
  text: { fontWeight: '400', color: '#000', paddingHorizontal: 10 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' }
});
