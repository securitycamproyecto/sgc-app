import { View, FlatList, StyleSheet } from 'react-native';
import ItemDevice from '../../../components/ItemList';
import React from 'react';

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
  return (
    <View style={styles.container}>
      <FlatList ItemSeparatorComponent={() => <Separator />} data={data} renderItem={({item}) => <ItemDevice text={item.text} nameNavigate="DetailDevice"/>}/>
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
