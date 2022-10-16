import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import services from '../../services/api';

const initForm: any = { name: '', location: '', clientId: '', model: '', serie: '', services: {} };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataDevice, setDataDevice] = useState<any>({...initForm});
  const [dataClients, setDataClients] = useState<any>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const setConfigScreen = () => {
    const { editMode } = props.route?.params;
    props.navigation.setOptions({
      title: editMode ? dataDevice.name : 'Nuevo dispositivo'
    });
  };

  const onChange = (newValue:object) => setDataDevice((prev: any) => ({...prev, ...newValue}));

  const saveModeCreate = async () => {
    await services.postDevices(dataDevice);
    Alert.alert('Dispositivo registrado');
  }

  const saveModeEdit = async () => {
    await services.putDevices(dataDevice);
    Alert.alert('Dispositivo actualizado');
  };

  const isModelValid = () => {
    if (!dataDevice.name) return false;
    if (!dataDevice.location) return false;
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
      setShowSpinner(true);
      editMode ? await saveModeEdit() : await saveModeCreate();
      setShowSpinner(false);
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
    if (dataDevice.id === 'd1a552e7-27ff-42d3-95e1-a35c97c2c1b8') {
      Alert.alert('Este dispositivo se encuentra protegido y no se puede eliminar');
      return;
    }
    setShowSpinner(true);
    await services.deleteDevices(dataDevice);
    setShowSpinner(false);
    Alert.alert('Dispositivo eliminado');
    props.navigation.goBack();
  }

  React.useEffect(() => {
    const load = async () => {
      const { data } = props.route?.params;
      setShowSpinner(true);
      if (data) {
        setDataDevice(data);
      }
      const clients = await services.getClients();
      setDataClients(clients.data.Items || []);
      setShowSpinner(false);
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
      <Spinner
        visible={showSpinner}
        textContent={'Aplicando cambios...'}
        // textStyle={styles.spinnerTextStyle}
      />
      <ScrollView style={styles.view}>
        <View style={{paddingBottom: 30}}/>
        <Text style={{color: 'black', marginBottom: 20, fontWeight: '600'}}>Detalle y datos personales</Text>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Nombre</Text>
          <TextInput placeholder='Ingrese nombre' value={dataDevice.name} onChangeText={(value) => onChange({name: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Ubicación</Text>
          <TextInput placeholder='Ingrese ubicación' value={dataDevice.location} onChangeText={(value) => onChange({location: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Cliente</Text>
          {/* <TextInput placeholder='' value={dataDevice.clientId} onChangeText={(value) => onChange({clientId: value})}/> */}
          <Picker
            selectedValue={dataDevice.clientId}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue: any, itemIndex: number) => onChange({clientId: itemValue})}
          >
            {
              dataClients.map((x: any) => 
                <Picker.Item label={x.name.S} value={x.id.S} />
              )
            }
          </Picker>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Modelo</Text>
          <TextInput placeholder='Ingrese modelo' value={dataDevice.model} onChangeText={(value) => onChange({model: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Serie</Text>
          <TextInput placeholder='Ingrese serie' value={dataDevice.serie} onChangeText={(value) => onChange({serie: value})}/>
        </View>
        <View style={{marginVertical: 7}}>
          <Text style={{color: 'black'}}>Kinesis Video Stream : {dataDevice.services?.KinesisVideoStream?.name || '-'}</Text>
        </View>
        <View style={{marginVertical: 50}}>
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
