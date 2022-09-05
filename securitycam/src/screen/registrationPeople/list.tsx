/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListPeopleContext } from '../../context/ListPeopleContext';

interface IItemPerson {
  authorize: boolean;
  name: string;
  navigation: any;
  edad: any;
  id: number;
}

function ItemPerson(props:IItemPerson){
  const { navigation, id, authorize } = props;
  return (
    <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate('DetailRegisterPeople', { id, editMode: true, authorize  })}>
      <Ionicons name={props.authorize ? 'checkmark-circle' : 'close-circle'} size={40} color={props.authorize ? 'green' : 'red'} />
      <Text style={styles.textItem}>{props.name}</Text>
      <Ionicons style={styles.iconItem} name="chevron-forward" size={30} />
    </TouchableOpacity>
  );
}

export default function List(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const { listPeople } =  React.useContext(ListPeopleContext);
  const [list, setList] = useState([] as any[]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: props.params?.authorize ? 'Personas autorizadas' : 'Personas no autorizadas',
        headerComponent: () =>
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailRegisterPeople', { authorize: props.params?.authorize, editMode: false, id: 0 })} >
            <Ionicons name="person-add" size={25} color="#333" style={{marginRight: 10}}/>
          </TouchableOpacity>,
        headerShown: true
      });
      setList(() => listPeople.filter((item) => item.authorize === props.params?.authorize));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
        renderItem={({item, index}) =>
          <ItemPerson
            name={item.name}
            key={index}
            id={item.id}
            edad={item.edad}
            authorize={props.params?.authorize}
            navigation={props.navigation}
          />
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
    fontWeight: '600'
  },
  iconItem: {
    marginLeft: 'auto'
  }
});
