/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useColorScheme, View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoComponent from './components/video';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import services from '../../services/api';

const VideoNotFound = () => {
  return (
    <View style={styles.videoNotFound}>
      <View style={styles.notFoundGroup}>
        <Ionicons name="alert-circle-outline" size={50} color="red" />
        <Text style={styles.notFoundText}>You don't have any cameras connected</Text>
        <Button color={'#ff9900'} title="Agregar cámara" onPress={() => console.log('agregar')}/>
      </View>
    </View>
  );
};

function Monitoring() {
  const navigation = useNavigation<any>();
  const { setSettings, clientId } = React.useContext(SettingContext);
  const [devices, setDevices] = React.useState<any>([]);
  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const load = async () => {
      const devices = await services.getDevicesByClient(clientId);
      const formatedDevices = devices.data.Items.map((x: any) => {
        return {
          streamName: JSON.parse(x.services.S).KinesisVideoStream?.name,
          id: x.id.S,
          name: x.name.S,
          location: x.location.S
        }
      });
      setDevices(formatedDevices);
    }
    if (isFocused) {
      setSettings({
        headerTitle: 'Monitoreo en Vivo',
        headerComponent: () => null,
        headerShown: true
      });
      load();
    }
  }, [isFocused, clientId]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            alignItems: "center",
            paddingVertical: 10
          }}>
            {
              devices.length === 0 ? (
                <VideoNotFound />
              ) : (
                <FlatList
                  data={devices}
                  renderItem={({item, index}) =>
                    <VideoComponent key={index} navigation={navigation} data={item}/>
                  }
                />
              )
            }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoNotFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFoundGroup: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFoundText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10
  },
  notFoundButton: {
    backgroundColor: 'red'
  }
});

export default Monitoring;
