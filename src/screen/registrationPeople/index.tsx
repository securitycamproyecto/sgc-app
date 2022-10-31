import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailRegisterPeople from './detail';
import ListRegisterPeople from './list';

const Stack = createNativeStackNavigator();

function StackRegistrationPeople(props:any) {
  const params = props.route?.params || {};
  return (
    <Stack.Navigator >
      <Stack.Screen name="ListRegisterPeople" component={(extra:any) => <ListRegisterPeople {...extra} params={params} />} options={{headerShown:false}}/>
      <Stack.Screen name="DetailRegisterPeople" component={DetailRegisterPeople}/>
    </Stack.Navigator>
  );
}

export default StackRegistrationPeople;
