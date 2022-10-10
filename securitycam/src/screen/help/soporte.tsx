import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingContext } from '../../context/SettingContext';
import services from '../../services/api';

export default function Soporte(){
  HeaderMainContextHook({headerShown: true, headerTitle: 'Soporte del Aplicativo', headerComponent: () => null});
  const { userId } = React.useContext(SettingContext);
  const [text, setText] = React.useState('');

  const requestSupport = async () => {
    const body = {
      clientId: '68fdd0e1-7520-4fa4-969c-efe4f7cc31b2',
      userId,
      body: text
    }
    await services.requestSupport(body);
    setText('');
    Alert.alert('Security Cam', 'Mensaje enviado');
    Linking.openURL(`tel:975408633`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese descripción del problema</Text>
      <View style={styles.groupInput}>
        <Text style={styles.label}>
          Código de usuario: {userId}
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={8}
          style={styles.txtArea}
          onChangeText={(e) => setText(e)}
          value={text}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={requestSupport}>
        <Ionicons name="call" size={30} color="#fff" style={styles.icon}/>
        <Text style={styles.text}>Enviar y Realizar llamada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: 'white'
  },
  groupInput: {
    paddingHorizontal: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20
  },
  label: {
    marginBottom: 10,
    color: '#9fa7b1'
  },
  txtArea: {
    borderColor: '#5a6978',
    borderWidth: 1,
    borderRadius: 12,
    textAlignVertical: 'top'
  },

  button: {
    backgroundColor: '#ff9900',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 'auto',
    borderRadius: 12
  },
  text: {
    color: '#fff',
    fontWeight: '600'
  },
  icon: {
    position: 'absolute',
    left: 10
  }
});
