import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListMonitoring from './list';
import MonitoringDetail from './detail';
import { NotificationListener } from '../../utils/pushnotification_helper';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function StackMonitoring() {
  const navigation = useNavigation();

  React.useEffect(() => {
    NotificationListener(navigation);
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name="ListMonitoring" component={ListMonitoring} options={{headerShown:false}}/>
      <Stack.Screen name="DetailMonitoring" component={MonitoringDetail}/>
    </Stack.Navigator>
  );
}

export default StackMonitoring;