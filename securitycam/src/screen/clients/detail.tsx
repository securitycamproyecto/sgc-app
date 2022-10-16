import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert, Modal, Pressable } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import services from '../../services/api';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const initForm = { id: null, name: '', document: '', phone: '', users: [] };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataClient, setDataClient] = useState({...initForm});
  const [dataUsers, setDataUsers] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const setConfigScreen = () => {
    const { editMode } = props.route?.params;
    props.navigation.setOptions({
      title: editMode ? dataClient.name : 'Nuevo cliente',
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons name="person-add" size={25} color="#333"/>
        </TouchableOpacity>
      )
    });
  };

  const onChange = (newValue: object) => setDataClient((prev) => ({...prev, ...newValue}));

  const saveModeCreate = async () => {
    await services.setClients(false, dataClient);
    Alert.alert('Persona registrada');
  }

  const saveModeEdit = async () => {
    await services.setClients(true, dataClient);
    Alert.alert('Persona actualizada');
  };

  const isModelValid = () => {
    if (!dataClient.name) return false;
    if (!dataClient.document) return false;
    if (!dataClient.phone) return false;
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
      "¿Desea eliminar el cliente de la lista?",
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
    if (dataClient.id === '68fdd0e1-7520-4fa4-969c-efe4f7cc31b2') {
      Alert.alert('Este cliente se encuentra protegido y no se puede eliminar');
      return;
    }
    await services.removeClients(dataClient.id);
    Alert.alert('Persona eliminada');
    props.navigation.goBack();
  }

  const removeUser = async (index: number) => {
    const newUsers = dataClient.users.filter((x, i) => i !== index);
    onChange({users: newUsers});
  }

  React.useEffect(() => {
    const load = async () => {
      const { data } = props.route?.params;
      if (data) {
        const newDataClient = {
          id: data.id.S,
          name: data.name.S,
          document: data.document.S,
          phone: data.phone.S,
          users: JSON.parse(data.users.S || '[]')
        };
        const users = await services.getUsers();
        const formatedUsers = users.data.filter((x: any) => x.Username !== 'admin').map((x: any) => {
          return { 
            id: x.Attributes[0].Value, 
            username: x.Username, 
            isChecked: newDataClient.users.find((y: any) => y.id === x.Attributes[0].Value) || false
          }
        });
        setDataClient(newDataClient);
        setDataUsers(formatedUsers)
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
  }, [dataClient.name]);

  const element = (index: number) => (
    <TouchableOpacity onPress={() => removeUser(index)}>
      <Ionicons name="close-circle" size={25} color="red"/>
    </TouchableOpacity>
  );

  const elementCheck = (index: number) => (
    <BouncyCheckbox
      size={20}
      unfillColor="#FFFFFF"
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
      isChecked={dataUsers[index].isChecked}
      onPress={(e: boolean) => onSelectUser(e, index)}
      style={{alignSelf: 'flex-end', paddingRight: 10}}
    />
  );

  const onSelectUser = (e: any, index: number) => {
    const newDataUsers = [...dataUsers];
    newDataUsers[index].isChecked = e;
    setDataUsers(newDataUsers);
  } 

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.view}>
        <View style={{paddingBottom: 30}}/>
        <Text style={{color: 'black', marginBottom: 20, fontWeight: '600'}}>Detalle y datos personales</Text>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Nombre o Razon social</Text>
          <TextInput placeholder='Ingrese nombre' value={dataClient.name} onChangeText={(value) => onChange({name: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Nro. de documento</Text>
          <TextInput placeholder='Ingrese nro. de documento' value={dataClient.document} onChangeText={(value) => onChange({document: value})}/>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black'}}>Telefono</Text>
          <TextInput placeholder='Ingrese telefono' value={dataClient.phone} onChangeText={(value) => onChange({phone: value})}/>
        </View>
        <Text style={{marginVertical: 10, fontWeight: '400', color: '#000'}}>Usuarios del cliente</Text>
        <View style={{marginVertical: 20, marginBottom: 50}}>
          <Table style={styles.tableHeader}>
            <Row data={['Usuarios', '']} widthArr={[250, 100]} style={styles.header} textStyle={styles.text}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table>
              {
                dataClient.users.map((rowData: any, index: number) => (
                  <TableWrapper key={index} style={[styles.row, { flexDirection: 'row' }, index%2 ? {backgroundColor: '#F7F6E7'}: {}]}>
                      <Cell data={rowData.username} width={250} textStyle={styles.text}/>
                      <Cell data={element(index)} width={100} textStyle={styles.text}/>
                  </TableWrapper>
                ))
              }
            </Table>
          </ScrollView>
        </View>
        <View>
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
        {
          modalVisible &&
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={stylesModal.centeredView}>
              <View style={stylesModal.modalView}>
                <View style={{flex: 1}}>
                  <ScrollView style={styles.dataWrapper}>
                    <Table>
                      {
                        dataUsers.map((rowData: any, index: number) => (
                          <TableWrapper key={index} style={[styles.row, { flexDirection: 'row' }]}>
                            <Cell data={rowData.username} width={200} textStyle={styles.text}/>
                            <Cell data={elementCheck(index)} width={100} textStyle={styles.text}/>
                          </TableWrapper>
                        ))
                      }
                    </Table>
                  </ScrollView>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonClose]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[stylesModal.textStyle, {color: '#ff9900'}]}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonSave]}
                    onPress={() => {
                      const users = dataUsers.filter((x: any) => x.isChecked);
                      onChange({users});
                      setModalVisible(false)
                    }}
                  >
                    <Text style={[stylesModal.textStyle, {color: '#fff'}]}>Guardar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        }
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
  row: { height: 40, backgroundColor: '#fff' },
  tableHeader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  }
});

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  buttonSave: {
    backgroundColor: "#ff9900",
  },
  buttonClose: {
    borderColor: '#ff9900',
    borderWidth: 1,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
