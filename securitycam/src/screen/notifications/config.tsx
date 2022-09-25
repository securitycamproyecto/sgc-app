/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, FlatList, Button, ScrollView, Alert } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import services from '../../services/api';

interface ITemplateItemConfig {
  color: string;
  text: string;
  index: number;
  onPress: (value: boolean, i: number) => any;
  isChecked: boolean;
}

function TemplateItemConfig(props: ITemplateItemConfig) {
  return (
    <BouncyCheckbox
      size={20}
      fillColor={props.color}
      unfillColor="#FFFFFF"
      text={props.text}
      iconStyle={{ borderColor: props.color }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
      isChecked={props.isChecked}
      onPress={(e: boolean) => props.onPress(e, props.index)}
    />
  );
}

const Config = () => {
  const { setSettings, userId, notificationsSettings } = React.useContext(SettingContext);
  const [options, setOptions] = React.useState<any>([]);
  const isFocused = useIsFocused();

  const onPress = (e: boolean, i: number) => {
    options[i].isChecked = e;
    setOptions(options);
  };

  const onSave = async () => {
    const body = {
      authorized: +options[0].isChecked + "",
      notAuthorized: +options[1].isChecked + "",
      unknown: +options[2].isChecked + "",
      token: notificationsSettings.token,
      clientId: notificationsSettings.clientId
    };
    try {
      await services.setNotificationsConfig(notificationsSettings.uuid, userId as unknown as string, body);
      Alert.alert('Configuración guardada');
    } catch (err) {
      Alert.alert('Error al guardar la configuración');
    }

  };

  const onFocused = () => {
    setSettings({
      headerTitle: 'Configuración',
      headerComponent: () => null,
      headerShown: true
    });
  };

  React.useEffect(() => {
    if (isFocused){
      onFocused();
    }
    const newOption = [
      {
        isChecked: notificationsSettings.authorized === '1',
        color: '#00a6ff',
        text: 'Notificaciones de personas autorizadas'
      },
      {
        isChecked: notificationsSettings.unknown === '1',
        color: '#ffba5c',
        text: 'Notificaciones de personas no conocidas'
      },
      {
        isChecked: notificationsSettings.notAuthorized === '1',
        color: '#f95f62',
        text: 'Notificaciones de personas no autorizadas'
      }
    ];

    setOptions(newOption);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={options}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        renderItem={({item, index}) =>
          <TemplateItemConfig
            text={item.text}
            color={item.color}
            index={index}
            onPress={onPress}
            isChecked={item.isChecked}
          />
        }
      />
      <View style={styles.buttonSeparator}/>
      <Button
        title="Guardar cambios"
        color="#ff9900"
        onPress={onSave}
      />
    </ScrollView>
  );
};

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
  },
  buttonSeparator: {
    marginTop: 20,
    marginBottom: 50,
    borderWidth: 0.2,
    borderColor: 'black'
  }
});

export default Config;
