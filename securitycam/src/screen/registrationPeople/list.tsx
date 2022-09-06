/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListPeopleContext } from '../../context/ListPeopleContext';
import services from '../../services/api';

interface IItemPerson {
  authorize: boolean;
  name: string;
  navigation: any;
  edad: any;
  id: string;
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

// const dataAuthorize = [
//   {name: 'Carlos Santana', id: 1, edad: 19, authorize: true},
//   {name: 'Mamá', id: 2, edad: 40, authorize: true},
//   {name: 'Tio Carlos', id: 3, edad: 49, authorize: true}
// ];

// const dataNoAuthorize = [
//   {name: 'Ex', id: 4, edad: 19, authorize: false}
// ];

export default function List(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const { listPeople } =  React.useContext(ListPeopleContext);
  const [list, setList] = useState([] as any[]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const load = async () => {
      const users = (await services.getPeople('4a64733d-79f5-4108-9258-646cb2dad018') as any).data.Items as Array<any>;
      const filterUsers = users.filter((x) => x.authorized.S == +props.params?.authorize);
      setList(filterUsers);
    }
    if (isFocused) {
      setSettings({
        headerTitle: props.params?.authorize ? 'Personas autorizadas' : 'Personas no autorizadas',
        headerComponent: () =>
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailRegisterPeople', { authorize: props.params?.authorize, editMode: false, id: 0 })} >
            <Ionicons name="person-add" size={25} color="#333" style={{marginRight: 10}}/>
          </TouchableOpacity>,
        headerShown: true
      });
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
        renderItem={({item, index}) =>
          <ItemPerson
            name={item.names.S}
            id={item.id.S}
            edad={item.age.S}
            authorize={Boolean(item.authorized.S)}
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
