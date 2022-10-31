import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import services from '../../services/api';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const initForm = { username: '', email: '', status: '', id: '' };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataUser, setDataUser] = useState({...initForm});
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const confirmDelete = () => {
    Alert.alert(
      "Security Cam",
      "¿Desea eliminar este usuario?",
      [
        {
          text: "No eliminar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sí", onPress: deleteUser }
      ]
    )
  }

  const deleteUser = async () => {
    try {
      setShowSpinner(true);
      await services.deleteUsers(dataUser.username);
      setShowSpinner(false);
      Alert.alert('Usuario eliminado');
      props.navigation.goBack();
    } catch (error) {
      console.log('Error deleting user', error);
    }
  }

  const setConfigScreen = () => {
    props.navigation.setOptions({
      title: dataUser.username
    });
  };

  React.useEffect(() => {
    const load = async () => {
      const { data } = props.route?.params;
      if (data) {
        setDataUser(data);
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
  }, [dataUser.username]);


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
          <Text style={{color: 'black', marginBottom: 5}}>Username</Text>
          <Text style={{color: 'black', marginBottom: 5}}>{dataUser.username}</Text>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black', marginBottom: 5}}>Correo</Text>
          <Text style={{color: 'black', marginBottom: 5}}>{dataUser.email}</Text>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black', marginBottom: 5}}>Estado de cuenta</Text>
          <Text style={{color: 'black', marginBottom: 5}}>{dataUser.status}</Text>
        </View>
        <View style={styles.groupInput}>
          <Text style={{color: 'black', marginBottom: 5}}>Sub</Text>
          <Text style={{color: 'black', marginBottom: 5}}>{dataUser.id}</Text>
        </View>
        <View style={{paddingTop: 30}}/>
      </ScrollView>
      <TouchableOpacity style={{...styles.btnDelete, ...styles.shadow}} onPress={confirmDelete}>
        <Ionicons name="trash-outline" size={35} color="#fff"/>
      </TouchableOpacity>
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
  text: { textAlign: 'center', fontWeight: '600' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' },
  btnDelete: {
    right: 25,
    bottom: 25,
    position: 'absolute',
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 50
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  }
});
