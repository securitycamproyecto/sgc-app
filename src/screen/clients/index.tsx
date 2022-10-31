import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailClients from './detail';
import ListClients from './list';

const Stack = createNativeStackNavigator();

function StackRegistrationPeople(props: any) {
  const params = props.route?.params || {};
  return (
    <Stack.Navigator >
      <Stack.Screen name="ListClients" component={(extra: any) => <ListClients {...extra} params={params} />} options={{headerShown:false}}/>
      <Stack.Screen name="DetailClients" component={DetailClients}/>
    </Stack.Navigator>
  );
}

export default StackRegistrationPeople;
