/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from '../../../components/DatePicker';
import { LineChart } from "react-native-chart-kit";
import React, { useState } from 'react';

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    },
    {
      data: [15, 25, 28, 40, 60, 24],
      color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Cochera", "Sala"] // optional
};

const chartConfig = {
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function General(props:any) {
  HeaderMainContextHook({
    headerTitle: 'General',
    headerComponent: () => null,
    headerShown: true
  });
  const [calendar, setCalendar] = useState({show: false, value: ''});
  const onChangeCalendar = (newValue:any) => setCalendar((prev:any) => ({...prev, ...newValue}));

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.calendar} onPress={() => onChangeCalendar({show: true})}>
        <Ionicons name="calendar" size={35} color="#333"/>
        <Text style={{color: '#333'}}> Dic 22, 2022</Text>
      </TouchableOpacity>
      { calendar.show && <DatePicker onChange={(value) => onChangeCalendar({show: false, value}) }/> }
      <View style={styles.group}>
        <View style={{...styles.groupDescription, ...styles.borderGroup, ...styles.shadow}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Cochera</Text>
            <View style={{borderColor: 'rgba(134, 65, 244, 1)', borderWidth: 0.5, width: '50%', height: 1, marginLeft: 'auto'}}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Sala</Text>
            <View style={{borderColor: 'rgba(50, 205, 50, 1)', borderWidth: 0.5, width: '50%', height: 1, marginLeft: 'auto'}}/>
          </View>
        </View>
        <View style={{...styles.groupTotal, ...styles.borderGroup, ...styles.shadow}}>
          <Ionicons name="git-branch" size={25} color="#333" style={{position: 'absolute', left: 6, top: 6}}/>
          <View>
            <Text style={{fontSize: 14}}>Total</Text>
            <Text style={{fontSize: 30, fontWeight: '600', color: '#333'}}>30</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={data}
        height={256}
        width={Dimensions.get('screen').width - 30}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        style={{borderRadius: 20, marginBottom: 15}}
      />
      <TouchableOpacity style={styles.btnRecord} onPress={() => props.navigation.navigate('Recordings')}>
        <Ionicons name="videocam" size={35} color="#fff"/>
        <Text style={styles.btnRecortColor }>Ver Grabación</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 15
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  group: {
    flexDirection: 'row',
    marginVertical: 15
  },
  groupDescription: {
    width: '65%',
    paddingHorizontal: 15,
    marginRight: 'auto'
  },
  groupTotal: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  borderGroup: {
    borderRadius: 8,
    minHeight: 80,
    borderColor: '#ff9900',
    borderWidth: 1.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  btnRecord: {
    backgroundColor: '#ff9900',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 45,
    width: 160,
    color: 'white'
  },
  btnRecortColor: {
    color: 'white',
    marginLeft: 10
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
