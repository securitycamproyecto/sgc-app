/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IItemPerson {
  authorize: boolean;
  name: string;
  navigation: any;
  edad: any;
}

function ItemPerson(props:IItemPerson){
  const { navigation, ...rest } = props;
  return (
    <TouchableOpacity style={styles.contentItem} onPress={() => navigation.navigate('DetailRegisterPeople', { user: rest })}>
      <Ionicons name={props.authorize ? 'checkmark-circle' : 'close-circle'} size={40} color={props.authorize ? 'green' : 'red'} />
      <Text style={styles.textItem}>{props.name}</Text>
      <Ionicons style={styles.iconItem} name="chevron-forward" size={30} />
    </TouchableOpacity>
  );
}

const dataAuthorize = [
  {name: 'Carlos Santana', id: 1, edad: 19, authorize: true},
  {name: 'Mamá', id: 2, edad: 40, authorize: true},
  {name: 'Tio Carlos', id: 3, edad: 49, authorize: true}
];

const dataNoAuthorize = [
  {name: 'Ex', id: 4, edad: 19, authorize: false}
];

export default function List(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const [list, setList] = useState([] as any[]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: props.params?.authorize ? 'Personas autorizadas' : 'Personas no autorizadas',
        headerComponent: () => null,
        headerShown: true
      });
      setList(() => props.params?.authorize ? dataAuthorize : dataNoAuthorize);
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
