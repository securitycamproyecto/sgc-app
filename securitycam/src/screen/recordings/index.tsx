import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListRecording from './list';
import DetailRecording from './detail';

const Stack = createNativeStackNavigator();

function StackRecording() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListRecording" component={ListRecording} options={{headerShown:false}}/>
      <Stack.Screen name="DetailRecording" component={DetailRecording} />
    </Stack.Navigator>
  );
}

export default StackRecording;
