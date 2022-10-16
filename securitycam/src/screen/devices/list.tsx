/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import services from '../../services/api';

interface IItemPerson {
  data: any
  navigation: any
}

function ItemPerson(props:IItemPerson){
  const { navigation, data } = props;
  return (
    <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate('DetailRegisterPeople', { editMode: true, data })}>
      {/* <Ionicons name={authorized ? 'checkmark-circle' : 'close-circle'} size={40} color={authorized ? 'green' : 'red'} /> */}
      <Text style={styles.textItem}>{data.names.S}</Text>
      <Ionicons style={styles.iconItem} name="chevron-forward" size={30} />
    </TouchableOpacity>
  );
}

export default function List(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [list, setList] = useState([] as any[]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const load = async () => {
      const users = (await services.getPeople('68fdd0e1-7520-4fa4-969c-efe4f7cc31b2') as any).data.Items as Array<any>;
      setList(users);
    }
    if (isFocused) {
      setSettings({
        headerTitle: 'Dispositivos',
        headerComponent: () =>
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailDevices', { editMode: false, data: null })} >
            <Ionicons name="add-circle" size={25} color="#333" style={{marginRight: 10}}/>
          </TouchableOpacity>,
        headerShown: true
      });
      // load();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
        renderItem={({item, index}) =>
          <ItemPerson data={item} navigation={props.navigation}/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  contentItem: {
    backgroundColor: '#eff1f2',
    minHeight: 80,
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    borderRadius: 15
  },
  textItem: {
    marginHorizontal: 15,
    fontWeight: '600',
    color: 'black'
  },
  iconItem: {
    marginLeft: 'auto',
    color: 'black'
  }
});
