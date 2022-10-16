/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import services from '../../services/api';

interface IItemClient {
  data: any
  navigation: any
}

function ItemClient(props:IItemClient) {
  const { navigation, data } = props;
  return (
    <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate('DetailClients', { editMode: true, data })}>
      {/* <Ionicons name={authorized ? 'checkmark-circle' : 'close-circle'} size={40} color={authorized ? 'green' : 'red'} /> */}
      <Text style={styles.textItem}>{data.name.S}</Text>
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
      const clients = (await services.getClients() as any).data?.Items as Array<any> || [];
      setList(clients);
    }
    if (isFocused) {
      setSettings({
        headerTitle: 'Clientes',
        headerComponent: () =>
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailClients', { editMode: false, data: null })} >
            <Ionicons name="person-add" size={25} color="#333" style={{marginRight: 10}}/>
          </TouchableOpacity>,
        headerShown: true
      });
      load();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
        renderItem={({item, index}) =>
          <ItemClient key={index} data={item} navigation={props.navigation}/>
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
