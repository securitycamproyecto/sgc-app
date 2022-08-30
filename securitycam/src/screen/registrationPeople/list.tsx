/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IItemPerson {
  authorize: boolean;
  desc: string;
  navigation: any;
}

function ItemPerson(props:IItemPerson){
  return (
    <TouchableOpacity style={styles.contentItem} onPress={() => props.navigation.navigate('DetailRegisterPeople')}>
      <Ionicons name={props.authorize ? 'checkmark-circle' : 'close-circle'} size={40} color={props.authorize ? 'green' : 'red'} />
      <Text style={styles.textItem}>{props.desc}</Text>
      <Ionicons style={styles.iconItem} name="chevron-forward" size={30} />
    </TouchableOpacity>
  );
}

const data = [
  {desc: 'Pablo', id: 1},
  {desc: 'Pable', id: 2},
  {desc: 'Pabli', id: 3}
];

export default function List(props:any) {
  const { setSettings } = React.useContext(SettingContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: props.params?.authorize ? 'Personas autorizadas' : 'Personas no autorizadas',
        headerComponent: () => null,
        headerShown: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
        renderItem={({item, index}) =>
          <ItemPerson
            desc={item.desc}
            key={index}
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
