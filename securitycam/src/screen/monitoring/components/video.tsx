/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {KinesisVideo} from '@aws-sdk/client-kinesis-video';
import {KinesisVideoArchivedMedia} from '@aws-sdk/client-kinesis-video-archived-media';
import Ionicons from 'react-native-vector-icons/Ionicons';
import awsConfig from '../../../../awsConfig';
import {Auth} from 'aws-amplify';
import Video from 'react-native-video';

// Amplify.configure(awsConfig);

const optionsDate = {
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "numeric"
};

const Loading = () => {
  return (
    <View style={{...styles.videoNotWorking, ...styles.loading}}>
      <Text style={styles.colorText}>Cargando...</Text>
    </View>
  );
};

const VideoNotWorking = () => {
  return (
    <View style={styles.videoNotWorking}>
      <Ionicons name="eye-off-outline" size={40} color="#fff"/>
      <Text style={styles.colorText}>No se pudo conectar la cámara, verifique que este conectado.</Text>
    </View>
  );
};

const VideoComponent = (props: any) => {
  const [urlStream, setUrlStream] = React.useState('');
  const [time, setTime] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [errorStream, setErrorStream] = React.useState({
    message: '',
    active: false
  });
  const player = React.useRef<any>();

  useEffect(() => {
    const load = async () => {
      const streamName = props.data.streamName;
      console.log(streamName);
      let options = {
        region: awsConfig.region,
        credentials: await Auth.currentCredentials()
      };
      try {
        const kinesisVideo = new KinesisVideo(options);
        const kinesisVideoResponse = await kinesisVideo.getDataEndpoint({StreamName: streamName, APIName: 'GET_HLS_STREAMING_SESSION_URL'});
        const kinesisVideoArchivedContent = new KinesisVideoArchivedMedia({...options, endpoint: kinesisVideoResponse.DataEndpoint});
        const kinesisVideoArchivedContentResponse = await kinesisVideoArchivedContent.getHLSStreamingSessionURL({
            StreamName: streamName,
            PlaybackMode: 'LIVE',
            HLSFragmentSelector: {
              FragmentSelectorType: 'SERVER_TIMESTAMP'
            },
            ContainerFormat: 'FRAGMENTED_MP4',
            DiscontinuityMode: 'ALWAYS',
            DisplayFragmentTimestamp: 'NEVER',
            Expires: 43200
        });
        console.log('===kinesisVideoArchivedContentResponse.HLSStreamingSessionURL===', kinesisVideoArchivedContentResponse.HLSStreamingSessionURL)
        setUrlStream(kinesisVideoArchivedContentResponse.HLSStreamingSessionURL || '');
        onChangeError({message: '', active: false});
        setLoading(false);
      } catch (err) {
        console.log(err);
        onChangeError({message: err, active: true});
        setLoading(false);
      }
    };
    load();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remove5hoursDate = new Date().getTime() - (3600000 * 5);
      setTime(new Date(remove5hoursDate).toLocaleTimeString("es-ES", {hour: '2-digit', minute:'2-digit', timeZone: "America/Lima"}));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const onChangeError = (value: object) =>
    setErrorStream(prev => ({...prev, ...value}));

  return (
    <View style={styles.view}>
      <View style={{...styles.headerVideo, ...styles.shadow}}>
        <Text style={[styles.colorText, {width: 140}]} numberOfLines={1} ellipsizeMode={'tail'}>{props.data.name} - {props.data.location}</Text>
        <View style={styles.timeHeader}>
          <Text style={{...styles.colorText, marginRight: 15}}>{new Date().toLocaleDateString("es-ES", optionsDate as any)}</Text>
          <Text style={styles.colorText}>{time}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailMonitoring', {title: 'Detalle en vivo', urlStream})}>
            <Ionicons name="eye" size={25} color="#fff"/>
          </TouchableOpacity>
        </View>
      </View>
      {
        loading ? (
          <Loading />
        ) : (
          errorStream.active ? (
            <VideoNotWorking />
          ) : (
            <Video
              key={props.id}
              playWhenInactive={true}
              useTextureView={false}
              playInBackground={true}
              disableFocus={true}
              source={{uri: urlStream}}
              controls
              posterResizeMode="cover"
              resizeMode="cover"
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
    width: Dimensions.get('window').width - 50,
    height: 260
  },
  headerVideo: {
    height: 40,
    backgroundColor: '#ff9900',
    flexDirection: 'row',
    // width: 300,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  timeHeader: {
    flexDirection: 'row',
    marginLeft: 'auto',
    paddingHorizontal: 15
  },
  colorText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  video: {
    height: 200
  },
  loading: {
  },
  videoNotWorking: {
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    // borderTopEndRadius: 20
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }
});

export default VideoComponent;
