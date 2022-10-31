import { View, FlatList, StyleSheet } from 'react-native';
import { SettingContext } from '../../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import ItemDevice from '../../../components/ItemList';
import React from 'react';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import services from '../../../services/api';

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
  HeaderMainContextHook({
    headerTitle: 'Grabaciones',
    headerComponent: () => null,
    headerShown: true
  });
  const { clientId } = React.useContext(SettingContext);
  const [devices, setDevices] = React.useState<any>([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const load = async () => {
      const devices = await services.getDevicesByClient(clientId);
      const formatedDevices = devices.data.Items.map((x: any) => {
        return {
          id: x.id.S,
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
      load();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList 
        ItemSeparatorComponent={() => <Separator />} 
        data={devices} 
        renderItem={({item}) => 
          <ItemDevice text={item.name} nameNavigate="DetailRecording" params={{title: item.name, ...item}}/>
        }
      />
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
