/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
    useColorScheme,
    View
  } from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import VideoComponent from './components/video';

function Monitoring() {
    const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            alignItems: "center"
          }}>
            <VideoComponent />
        </View>
    </View>
  );
}

export default Monitoring;
