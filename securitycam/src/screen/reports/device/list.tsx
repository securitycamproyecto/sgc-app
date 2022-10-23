import { View, FlatList, StyleSheet } from 'react-native';
import { SettingContext } from '../../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import ItemDevice from '../../../components/ItemList';
import services from '../../../services/api';
import React from 'react';

function Separator(){
  return (
    <View style={styles.separator}/>
  );
}

export default function ListDevice() {
  const { setSettings, clientId } = React.useContext(SettingContext);
  const [devices, setDevices] = React.useState<any>([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const load = async () => {
      const devices = await services.getDevicesByClient(clientId);
      const formatedDevices = devices.data.Items.map((x: any) => {
        return {
          streamName: JSON.parse(x.services.S).KinesisVideoStream?.name,
          name: x.name.S,
          location: x.location.S,
          model: x.model.S,
          serie: x.serie.S,
        }
      });
      setDevices(formatedDevices);
    }
    if (isFocused) {
      setSettings({
        headerTitle: 'Dispositivos',
        headerComponent: () => null,
        headerShown: true
      });
      load();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList 
        ItemSeparatorComponent={() => <Separator />} 
        data={devices} 
        renderItem={({item}) => 
          <ItemDevice text={item.name + ' - ' + item.location} nameNavigate="DetailDevice" params={{title: item.name, ...item}}/>
        }/>
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
