/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import {
  Button,
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
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './awsConfig';

// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';

import { KinesisVideo } from "@aws-sdk/client-kinesis-video";
import { KinesisVideoArchivedMedia } from "@aws-sdk/client-kinesis-video-archived-media";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import Video from 'react-native-video';

Amplify.configure(awsConfig);

const App = () => {
  let kinesisVideo;
  let kinesisVideoArchivedContent: KinesisVideoArchivedMedia;
  let player;

  const [urlStream, setUrlStream] = React.useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const signOut = async () => {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  useEffect(() => {
    const load = async () => {
      var options = {
          // accessKeyId: 's0BjAnqwjj82IwYipebYKg8+9dVPxi/Q7tQ1sXFI',
          // secretAccessKey: 'AKIASA3V2VWZFEN4AA7T',
          // sessionToken: undefined,
          region: awsConfig.region,
          credentials: await Auth.currentCredentials()
      };
      console.log(options);
      kinesisVideo = new KinesisVideo(options);
      kinesisVideo.getDataEndpoint({
        StreamName: 'MyKVStream',
        APIName: 'GET_HLS_STREAMING_SESSION_URL'
      }, (err: any, response: any) => {
        if (err) { return console.error('YIYO', err); }
        console.log('Data endpoint: ' + response.DataEndpoint);
        kinesisVideoArchivedContent = new KinesisVideoArchivedMedia({...options, endpoint: response.DataEndpoint});
        kinesisVideoArchivedContent.getHLSStreamingSessionURL({
          "StreamName": "MyKVStream",
          "PlaybackMode": "LIVE",
          "HLSFragmentSelector": {
            "FragmentSelectorType": "SERVER_TIMESTAMP"
          },
          "ContainerFormat": "FRAGMENTED_MP4",
          "DiscontinuityMode": "ALWAYS",
          "DisplayFragmentTimestamp": "NEVER",
          "Expires": 43200
        }, (err: any, response: any) => { 
          if (err) { 
            return console.error('NERDS', err); 
          }
          console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
          setUrlStream(response.HLSStreamingSessionURL);
        });
      });
    }
    load();
  }, [])

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            alignItems: 'center'
          }}>
            <Video source={{uri: urlStream}}   // Can be a URL or a local file.
            ref={(ref: any) => {
              player = ref
            }}                                      // Store reference
            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
            // onError={this.videoError}               // Callback when video cannot be loaded
            // resizeMode="cover"
            resizeMode='stretch'
            style={{
                // position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: 300,
                height: 300,
                margin: 50
            }} 
            />
            <Button onPress={signOut} title='Cerrar session'/>
        </View>
    //   </ScrollView>
    // </SafeAreaView>
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

export default withAuthenticator(App);
