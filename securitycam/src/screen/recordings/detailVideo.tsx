import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import HeaderMainContextHook from '../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';

export default function DetailVideo(props:any) {
  const [dataDetailVideo, setDataDetailVideo] = useState({age: 0, date: '', percentage: 0, personDetected: '', sex: '', alert: ''});
  HeaderMainContextHook({headerShown: false});

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
    setDataDetailVideo({...props.route.params});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route?.params.title]);

  const deleteVideo = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Video
          source={{uri: 'https://www.youtube.com/watch?v=6XglcbMssJs'}}
          controls
          posterResizeMode="cover"
          resizeMode="cover"
          style={styles.video}
        />
        <Text style={{...styles.text, ...styles.textTitle, ...styles.shadow}}>Detalle de la identificación</Text>
        <View style={styles.separator}/>
        <Text style={styles.text}>Identificación: {dataDetailVideo.percentage}% {dataDetailVideo.personDetected.toLocaleUpperCase()}</Text>
        <Text style={styles.text}>Edad: {dataDetailVideo.age} años (aprox.)</Text>
        <Text style={styles.text}>Sexo: {dataDetailVideo.sex}</Text>
        <Text style={styles.text}>Tiempo: {dataDetailVideo.date}</Text>
        <Text style={styles.text}>Alerta: {dataDetailVideo.alert}</Text>
        <TouchableOpacity style={{...styles.btnDelete, ...styles.shadow}} onPress={deleteVideo}>
          <Ionicons name="trash-outline" size={35} color="#fff"/>
        </TouchableOpacity>
    </View>
  );
}

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
    fontWeight: '500'
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
