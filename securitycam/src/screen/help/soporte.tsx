import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Soporte(){
  HeaderMainContextHook({headerShown: true, headerTitle: 'Soporte del Aplicativo', headerComponent: () => null});
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingrese descripción del problema</Text>
        <View style={styles.groupInput}>
          <Text style={styles.label}>
            Código de usuario: 00075843
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={8}
            style={styles.txtArea}
            //onChangeText={(text) => this.setState({text})}
            //value={this.state.text}
          />
        </View>
        <View style={styles.button}>
          <Ionicons name="call" size={30} color="#fff" style={styles.icon}/>
          <Text style={styles.text}>Enviar y Realizar llamada</Text>
        </View>
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
    marginBottom: 6,
    color: '#9fa7b1'
  },
  txtArea: {
    borderColor: '#5a6978',
    borderWidth: 1,
    borderRadius: 12
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
