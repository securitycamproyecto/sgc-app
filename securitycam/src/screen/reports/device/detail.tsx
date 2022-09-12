/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';

export default function Detail(props:any) {
  HeaderMainContextHook({headerShown: false});

  useEffect(() => {
    props.navigation.setOptions({title: props.route?.params.title || 'Loading...'});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route?.params.title]);

  return (
    <View style={styles.view}>
      <View style={styles.groupHeader}>
        <View style={styles.headerPercentage}>
          <View style={styles.percentageBase}/>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#333'}}>100%</Text>
          <Text>Batería</Text>
        </View>
        <View style={styles.headerDesc}>
          <Text style={{color: '#969faa', marginBottom: 5}}>Modelo:</Text>
          <Text style={{color: '#47525e', marginBottom: 5}}>DS-23DSJ421L-IW</Text>
          <View style={{marginVertical: 10}}/>
          <Text style={{color: '#969faa', marginBottom: 5}}>Serie:</Text>
          <Text style={{color: '#47525e', marginBottom: 5}}>Skancd12395na</Text>
        </View>
      </View>

      <View>
        <Text style={styles.textTitle}>Datos de salud del dispositivo</Text>

        <View style={styles.groupDesc}>
          <Text style={{color: '#969faa'}}>Horas de uso</Text>
          <Text style={{color: '#343f4b'}}>3:23:20:11</Text>
        </View>

        <View style={styles.groupDesc}>
          <Text style={{color: '#969faa'}}>Latencia</Text>
          <Text style={{color: '#343f4b'}}>38 ms</Text>
        </View>

        <View style={styles.groupDesc}>
          <Text style={{color: '#969faa'}}>Velocidad</Text>
          <Text style={{color: '#343f4b'}}>3,05 GHz</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginBottom: 10
  },
  headerPercentage: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  percentageBase: {
    borderColor: 'green',
    borderWidth: 14,
    borderRadius: 70,
    height: 140,
    width: 140,
    position: 'absolute'
  },
  headerDesc: {
    width: '35%',
    marginLeft: 20
  },
  textTitle: {
    color: '#333',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 15
  },
  groupDesc: {
    backgroundColor: '#eff1f2',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 15
  }
});
