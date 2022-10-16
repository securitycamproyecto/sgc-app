import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailUsers from './detail';
import ListUsers from './list';

const Stack = createNativeStackNavigator();

function StackRegistrationPeople(props: any) {
  const params = props.route?.params || {};
  return (
    <Stack.Navigator >
      <Stack.Screen name="ListUsers" component={(extra: any) => <ListUsers {...extra} params={params} />} options={{headerShown:false}}/>
      <Stack.Screen name="DetailUsers" component={DetailUsers}/>
    </Stack.Navigator>
  );
}

export default StackRegistrationPeople;
