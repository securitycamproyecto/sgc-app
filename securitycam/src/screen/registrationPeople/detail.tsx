import { View, Text } from 'react-native';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import React from 'react';

export default function Detail() {
  const { setSettings } = React.useContext(SettingContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerShown: false
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
}
