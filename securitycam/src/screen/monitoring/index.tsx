/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useColorScheme, View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoComponent from './components/video';
import { SettingContext } from '../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";

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
  const [data] = React.useState([1, 2] as any[]);
  const { setSettings } = React.useContext(SettingContext);
  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused){
      setSettings({
        headerTitle: 'Monitoreo en Vivo',
        headerComponent: () => null,
        headerShown: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            alignItems: "center"
          }}>
            {
              data.length === 0 ? (
                <VideoNotFound />
              ) : (
                <FlatList
                  data={data}
                  renderItem={({}) =>
                    <VideoComponent />
                  }
                  ItemSeparatorComponent={() => <View style={{marginVertical: 15}}/>}
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
