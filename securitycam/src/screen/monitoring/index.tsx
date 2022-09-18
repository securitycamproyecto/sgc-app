import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListMonitoring from './list';
import MonitoringDetail from './detail';

const Stack = createNativeStackNavigator();

function StackMonitoring() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListMonitoring" component={ListMonitoring} options={{headerShown:false}}/>
      <Stack.Screen name="DetailMonitoring" component={MonitoringDetail}/>
    </Stack.Navigator>
  );
}

export default StackMonitoring;