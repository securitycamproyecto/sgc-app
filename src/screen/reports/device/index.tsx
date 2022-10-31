import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListDevice from './list';
import DetailDevice from './detail';

const Stack = createNativeStackNavigator();

function StackDevice() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListDevice" component={ListDevice} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailDevice" component={DetailDevice} />
    </Stack.Navigator>
  );
}

export default StackDevice;
