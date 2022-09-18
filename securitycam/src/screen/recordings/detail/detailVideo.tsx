import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import awsConfig from '../../../../awsConfig';
import { Auth } from 'aws-amplify';
import moment from 'moment';

const DetailVideo = (props:any) => {
  const [dataDetailVideo, setDataDetailVideo] = useState({id: '', clientId: '', date: '', label: '', matchedFace: [], detectedFace: {}, names: '', type: '', similarity: ''});
  const [clipUrl, setClipUrl] = useState('');
  HeaderMainContextHook({headerShown: false});

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
    setDataDetailVideo({...props.route.params});
  }, [props.route?.params.title]);

  useEffect(() => {
    const load = async () => {
      const s3 = new S3Client({region: awsConfig.region, credentials: await Auth.currentCredentials()});
      const command = new GetObjectCommand({Bucket: 'myrekognitioncollections', Key: 'clip_' + dataDetailVideo.id});
      const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60*60*24});
      setClipUrl(signedUrl);
    }
    load();
  }, [dataDetailVideo])

  const deleteVideo = () => {
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
          dataDetailVideo.label !== 'unknown' ?
            <Text style={styles.text}>Identificación: {dataDetailVideo.similarity}% {dataDetailVideo.names.toLocaleUpperCase()}</Text>
            :
            <Text style={styles.text}>Identificación: desconocido</Text>
        }
        <Text style={styles.text}>Edad: 0 años (aprox.)</Text>
        <Text style={styles.text}>Sexo: </Text>
        <Text style={styles.text}>Tiempo: {moment(dataDetailVideo.date).format('DD/MM/YYYY h:mm:ss a')}</Text>
        <Text style={styles.text}>Alerta: {dataDetailVideo.type}</Text>
        <TouchableOpacity style={{...styles.btnDelete, ...styles.shadow}} onPress={deleteVideo}>
          <Ionicons name="trash-outline" size={35} color="#fff"/>
        </TouchableOpacity>
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
