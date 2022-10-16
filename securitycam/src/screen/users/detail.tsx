import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

const initForm = { username: '', email: '', status: '', id: '' };

export default function Detail(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [dataUser, setDataUser] = useState({...initForm});
  const isFocused = useIsFocused();

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
  row: { height: 40, backgroundColor: '#fff' }
});
