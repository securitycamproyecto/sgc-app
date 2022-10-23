import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking, ToastAndroid, PermissionsAndroid } from 'react-native';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import awsConfig from '../../../../awsConfig';
import { Auth } from 'aws-amplify';
import services from './../../../services/api';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const DetailVideo = (props:any) => {
  const [dataDetailVideo, setDataDetailVideo] = useState({id: '', clientId: '', date: '', label: '', matchedFace: [], detectedFace: {}, names: '', type: '', similarity: ''});
  const [clipUrl, setClipUrl] = useState('');
  HeaderMainContextHook({headerShown: false});

  const loadRecord = async (recordId: string, clientId: string) => {
    const result = await services.getRecord(recordId, clientId);
    try {
      const record = result.data[0];
      if(record)
        setDataDetailVideo(record);
    } catch (err) { console.log(err) };
  }

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Grabación'});
    if (!props.route.params.recordId)
      setDataDetailVideo({...props.route.params});
    else {
      loadRecord(props.route.params.recordId, props.route.params.clientId);
    }
  }, [props.route?.params.title]);

  useEffect(() => {
    const load = async () => {
      try {
        const s3 = new S3Client({region: awsConfig.region, credentials: await Auth.currentCredentials()});
        const command = new GetObjectCommand({Bucket: 'myrekognitioncollections', Key: 'clip_' + dataDetailVideo.id});
        const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60*60*24});
        setClipUrl(signedUrl);
      } catch(err) { }
    }
    load();
  }, [dataDetailVideo]);

  const askPermission = async () => {
    console.log("asking permission");
    const granted = await PermissionsAndroid.check(
      "android.permission.READ_EXTERNAL_STORAGE"
    );
    if (!granted) {
      console.log("Permission not granted");
      const response = await PermissionsAndroid.request(
        "android.permission.READ_EXTERNAL_STORAGE"
      );
      if (!response) {
        console.log("Permission not granted & non respinse");
        return;
      }
    } else {
      console.log("Permission granted");
    }
  }

  const singleShare = async (customOptions: any) => {
    try {
      await Share.shareSingle(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const shareVideo = async () => {
    const { config, fs } = RNFetchBlob;
    await askPermission();

    // console.log(clipUrl);
    // const formatText = encodeURI(`Una persona ha sido detectada. Revisa el video del siguiente enlace: ${clipUrl}`);
    // console.log(formatText);
    // Linking.openURL(`whatsapp://send?text=${formatText}`);

    const RootDir = fs.dirs.PictureDir;
    const filename = 'clip_' + dataDetailVideo.id + '.mp4';
    const path = RootDir + '/' + filename;
    const options = {
      fileCache: true,
      // appendExt : 'mp4'
      addAndroidDownloads: {
        path,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,   
      },
    };
    ToastAndroid.showWithGravityAndOffset("Descargando archivo...", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    config(options).fetch('GET', clipUrl)
    .then(res => {
      console.log('res -> ', JSON.stringify(res));
      console.log(path);
      const shareVideo = async () => {
        const base64 = await res.base64();
        singleShare({
          title: "Compartir via whatsapp",
          message: "Una persona ha sido detectada. Revisa siguiente video",
          url: `data:video/mp4;base64,${base64}`,
          social: Share.Social.WHATSAPP,
          filename: filename,
          type: 'video/*'
        });
      }
      shareVideo();
    });
    
    // singleShare({
    //   title: "Compartir via whatsapp",
    //   message: "Una persona ha sido detectada. Revisa el video del siguiente enlace",
    //   url: clipUrl,
    //   social: Share.Social.WHATSAPP,
    //   filename: filename,
    // });
  }

  const deleteVideo = async () => {
    services.removeRecord(dataDetailVideo.id);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Video
          source={{uri: clipUrl}}
          controls
          posterResizeMode="cover"
          resizeMode="cover"
          style={styles.video}
        />
        <Text style={{...styles.text, ...styles.textTitle, ...styles.shadow}}>Detalle de la identificación</Text>
        <View style={styles.separator}/>
        {
          dataDetailVideo.id &&
          <>
            {
              dataDetailVideo.label !== 'unknown' ?
                <Text style={styles.text}>Identificación: {dataDetailVideo.similarity}% {dataDetailVideo.names.toLocaleUpperCase()}</Text>
                :
                <Text style={styles.text}>Identificación: desconocido</Text>
            }
            <Text style={styles.text}>Edad: 0 años (aprox.)</Text>
            <Text style={styles.text}>Sexo: No definido</Text>
            <Text style={styles.text}>Tiempo: {moment(dataDetailVideo.date).format('DD/MM/YYYY h:mm:ss a')}</Text>
            <Text style={styles.text}>Alerta: {dataDetailVideo.type}</Text>
            <TouchableOpacity style={{...styles.btnShare, ...styles.shadow}} onPress={shareVideo}>
              <Ionicons name="share-social-sharp" size={35} color="#ff9900"/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.btnDelete, ...styles.shadow}} onPress={deleteVideo}>
              <Ionicons name="trash-outline" size={35} color="#fff"/>
            </TouchableOpacity>
          </>
          ||
          <Text style={styles.text}>La grabación no se encuentra o ha sido eliminada</Text>
        }
    </View>
  );
}

export default DetailVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 30
  },
  video: {
    height: 250,
    width: Dimensions.get('window').width
  },
  text: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    paddingVertical: 5
  },
  textTitle: {
    paddingVertical: 18,
    paddingTop: 18,
    backgroundColor: '#ff9900',
    color: 'white'
  },
  separator: {
    marginBottom: 20
  },
  btnDelete: {
    right: 25,
    bottom: 25,
    position: 'absolute',
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 50
  },
  btnShare: {
    right: 25,
    bottom: 115,
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  }
});
