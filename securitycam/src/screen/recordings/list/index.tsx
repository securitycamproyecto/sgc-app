import { View, FlatList, StyleSheet } from 'react-native';
import ItemDevice from '../../../components/ItemList';
import React from 'react';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

const data = [
  {text: 'Sala'},
  {text: 'Cochera'},
  {text: 'Entrada'}
];

export default function ListDevice() {
  HeaderMainContextHook({
    headerTitle: 'Grabaciones',
    headerComponent: () => null,
    headerShown: true
  });

  return (
    <View style={styles.container}>
      <FlatList ItemSeparatorComponent={() => <Separator />} data={data} renderItem={({item}) => <ItemDevice text={item.text} nameNavigate="DetailRecording" params={{title: item.text}}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  }
});
