import { View, FlatList, StyleSheet } from 'react-native';
import { SettingContext } from '../../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import ItemDevice from '../../../components/ItemList';
import React from 'react';

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

const data = [
  {text: 'Sala'},
  // {text: 'Cochera'},
  // {text: 'Entrada'}
];

export default function ListDevice() {
  const { setSettings } = React.useContext(SettingContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: 'Dispositivos',
        headerComponent: () => null,
        headerShown: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList ItemSeparatorComponent={() => <Separator />} data={data} renderItem={({item}) => <ItemDevice text={item.text} nameNavigate="DetailDevice" params={{title: item.text}}/>}/>
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
