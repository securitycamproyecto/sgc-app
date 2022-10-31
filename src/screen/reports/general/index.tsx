/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import HeaderMainContextHook from '../../../hooks/HeaderMainContextHook';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from '../../../components/DatePicker';
import { LineChart } from "react-native-chart-kit";
import React, { useState } from 'react';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { SettingContext } from '../../../context/SettingContext';
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import services from '../../../services/api';

const chartConfig = {
  backgroundColor: "#00",
  backgroundGradientFrom: "#efefef",
  backgroundGradientTo: "#efefef",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  // useShadowColorFromDataset: false // optional
};

export default function General(props:any) {
  HeaderMainContextHook({
    headerTitle: 'General',
    headerComponent: () => null,
    headerShown: true
  });
  const { clientId } = React.useContext(SettingContext);
  const [calendar, setCalendar] = useState({show: false, value: Date.now()});
  const [reportData, setReportData] = useState({labels: ['none'], data: [0]});
  const [devices, setDevices] = useState<any>([]);
  const [selectDevice, setSelectDevice] = useState<any>({id: null, name: ''});
  const [total, setTotal] = useState(0);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const loadReport = async (newValue: any = null, deviceId: string = '') => {
    if (newValue === calendar.value && deviceId === selectDevice.id) return;
    setShowSpinner(true);
    const date = moment(newValue || calendar.value).format('YYYY-MM-DD');
    const result: any = await services.getReports(clientId, deviceId || selectDevice.id, date);
    const labels = Object.keys(result.data).sort((x: any, y: any) => new Date(x).getTime() - new Date(y).getTime());
    const data: Array<number> = [];
    for (const label of labels) {
      data.push(result.data[label])
    }
    if (labels.length === 0) labels.push(date);
    if (data.length === 0) data.push(0);
    setReportData({labels, data});
    setTotal(data.reduce((x: any, y: any) => x + y, 0));
    setShowSpinner(false);
  }

  const onChangeCalendar = (newValue: any) => {
    if (newValue.value)
      loadReport(newValue.value, selectDevice.id);
    setCalendar((prev:any) => ({...prev, ...newValue}));
  }

  React.useEffect(() => {
    const load = async () => {
      setShowSpinner(true);
      const devices = await services.getDevicesByClient(clientId);
      setShowSpinner(false);
      const formatedDevices = devices.data.Items.map((x: any) => {
        return {
          id: x.id.S,
          name: x.name.S,
          location: x.location.S
        }
      });
      setDevices(formatedDevices);
      setSelectDevice(formatedDevices[0]);
      loadReport();
    }
    if (isFocused) load();
  }, [isFocused])

  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={showSpinner}
      />
      <TouchableOpacity style={styles.calendar} onPress={() => onChangeCalendar({show: true})}>
        <Ionicons name="calendar" size={35} color="#333" style={{paddingRight: 10}}/>
        <Text style={{color: '#333'}}>{moment(calendar.value).format('MMM DD, YYYY')}</Text>
      </TouchableOpacity>
      { calendar.show && <DatePicker onChange={(value) => onChangeCalendar({show: false, value}) }/> }
      <View style={styles.group}>
        <View style={{...styles.groupDescription, ...styles.borderGroup, ...styles.shadow}}>
          <Picker
            selectedValue={selectDevice}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue: any, itemIndex: number) => {
              setSelectDevice(itemValue); loadReport(calendar.value, itemValue.id)
            }}
          >
            {
              devices.map((x: any) => 
                <Picker.Item label={x.name} value={x} />
              )
            }
          </Picker>
        </View>
        <View style={{...styles.groupTotal, ...styles.borderGroup, ...styles.shadow}}>
          <Ionicons name="git-branch" size={25} color="#333" style={{position: 'absolute', left: 6, top: 6}}/>
          <View>
            <Text style={{fontSize: 14}}>Total</Text>
            <Text style={{fontSize: 30, fontWeight: '600', color: '#333'}}>{total}</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={{
          labels: reportData.labels,
          datasets: [
            {
              data: reportData.data,
              color: (opacity = 1) => `rgba(34, 189, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            },
          ],
          legend: [selectDevice.name] // optional
        }}
        height={256}
        width={Dimensions.get('screen').width - 30}
        // verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        style={{borderRadius: 10, marginBottom: 15}}
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
