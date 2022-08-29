/* eslint-disable jsx-quotes */
import {View, StyleSheet, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {KinesisVideo} from '@aws-sdk/client-kinesis-video';
import {KinesisVideoArchivedMedia} from '@aws-sdk/client-kinesis-video-archived-media';
import Ionicons from 'react-native-vector-icons/Ionicons';
import awsConfig from '../../../../awsConfig';
import Amplify, {Auth} from 'aws-amplify';
import Video from 'react-native-video';

Amplify.configure(awsConfig);

const VideoNotFound = () => {
    return (
        <View style={styles.videoNotFound}>
          <View style={styles.notFoundGroup}>
            <Ionicons name="alert-circle-outline" size={50} color='red' />
            <Text style={styles.notFoundText}>You don't have any cameras connected</Text>
            <Button color={'#ff9900'} title='Agregar cámara' onPress={() => console.log('agregar')}/>
          </View>
        </View>
    );
};

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Text>Cargando...</Text>
    </View>
  );
};

const VideoComponent = () => {
  const [urlStream, setUrlStream] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [errorStream, setErrorStream] = React.useState({
    message: '',
    active: false
  });
  let kinesisVideo;
  let kinesisVideoArchivedContent: KinesisVideoArchivedMedia;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let player: Video | null = null;

  useEffect(() => {
    const load = async () => {
      let options = {
        // accessKeyId: 's0BjAnqwjj82IwYipebYKg8+9dVPxi/Q7tQ1sXFI',
        // secretAccessKey: 'AKIASA3V2VWZFEN4AA7T',
        // sessionToken: undefined,
        region: awsConfig.region,
        credentials: await Auth.currentCredentials()
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      kinesisVideo = new KinesisVideo(options);
      kinesisVideo.getDataEndpoint(
        {
          StreamName: 'MyKVStream',
          APIName: 'GET_HLS_STREAMING_SESSION_URL'
        },
        (err: any, response: any) => {
          if (err) {
            onChangeError({message: err, active: true});
            setLoading(false);
            return console.error('YIYO', err);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
          kinesisVideoArchivedContent = new KinesisVideoArchivedMedia({
            ...options,
            endpoint: response.DataEndpoint
          });
          kinesisVideoArchivedContent.getHLSStreamingSessionURL(
            {
              StreamName: 'MyKVStream',
              PlaybackMode: 'LIVE',
              HLSFragmentSelector: {
                FragmentSelectorType: 'SERVER_TIMESTAMP'
              },
              ContainerFormat: 'FRAGMENTED_MP4',
              DiscontinuityMode: 'ALWAYS',
              DisplayFragmentTimestamp: 'NEVER',
              Expires: 43200
            },
            (err2, response2: any) => {
              if (err2) {
                setLoading(false);
                onChangeError({message: err2, active: true});
                return console.error('NERDS', err2);
              }
              console.log(
                'HLS Streaming Session URL: ' +
                  response2.HLSStreamingSessionURL,
              );
              setUrlStream(response2.HLSStreamingSessionURL);
              onChangeError({message: '', active: false});
              setLoading(false);
            }
          );
        }
      );
    };
    load();
  }, []);

  const onChangeError = (value: object) =>
    setErrorStream(prev => ({...prev, ...value}));

  return (
    <View style={styles.view}>
      {
        loading ? (
          <Loading />
        ) : (
          errorStream.active ? (
            <VideoNotFound />
          ) : (
            <Video
              source={{uri: urlStream}}
              ref={ref => {
                player = ref;
              }}
              resizeMode="stretch"
              style={styles.video}
            />
          )
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
  },
  video: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 300,
    height: 300,
    margin: 50
  },
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
  },
  loading: {
  }
});

export default VideoComponent;
