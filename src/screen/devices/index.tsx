import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailDevices from './detail';
import ListDevices from './list';

const Stack = createNativeStackNavigator();

function StackRegistrationPeople(props: any) {
  const params = props.route?.params || {};
  return (
    <Stack.Navigator >
      <Stack.Screen name="ListDevices" component={(extra: any) => <ListDevices {...extra} params={params} />} options={{headerShown:false}}/>
      <Stack.Screen name="DetailDevices" component={DetailDevices}/>
    </Stack.Navigator>
  );
}

export default StackRegistrationPeople;
