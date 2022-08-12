/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';

// const VLCPlayer = require('react-native-vlc-media-player').VLCPlayer;
// const VlCPlayerView = require('react-native-vlc-media-player').VlCPlayerView;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
             {/* <VlCPlayerView
                autoplay={false}
                url={'rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101'}
                // Orientation={''}
                //BackHandle={BackHandle}
                ggUrl=""
                showGG={true}
                showTitle={true}
                title=""
                showBack={true}
                onLeftPress={()=>{}}
                // startFullScreen={() => {
                //     this.setState({
                //     isFull: true,
                //   });
                // }}
                // closeFullScreen={() => {
                //     this.setState({
                //     isFull: false,
                //   });
                // }}
            /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
