/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface ITemplateItemConfig {
  isChecked: boolean;
  color: string;
  text: string;
  onChange: (value:any) => any;
}

function TemplateItemConfig(props:ITemplateItemConfig){
  return (
    <BouncyCheckbox
      size={25}
      fillColor={props.color}
      unfillColor="#FFFFFF"
      text={props.text}
      iconStyle={{ borderColor: props.color }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
      onPress={(isChecked: boolean) => console.log(isChecked)}
    />
  );
}

export default function Config() {
  const { setSettings } = React.useContext(SettingContext);
  const [configList, setConfigList] = useState(data);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: 'Configuración',
        headerComponent: () => null,
        headerShown: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={configList}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        renderItem={({item}) =>
          <TemplateItemConfig
            color={item.color}
            isChecked={item.isChecked}
            onChange={setConfigList}
            text={item.text}
          />
        }
      />
      <View style={styles.separator}/>
      <Button
        title="Guardar cambios"
        color="#ff9900"
        onPress={() => console.log('guardado papu :v')}
      />
    </ScrollView>
  );
}

const data = [
  {isChecked: true, color: '#00a6ff', text: 'Notificaciones de personas autorizadas'},
  {isChecked: true, color: '#ffba5c', text: 'Notificaciones de personas no conocidas'},
  {isChecked: true, color: '#f95f62', text: 'Notificaciones de personas no autorizadas'}
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30
  },
  separator: {
    marginVertical: 20,
    borderWidth: 0.2,
    borderColor: 'black'
  }
});
