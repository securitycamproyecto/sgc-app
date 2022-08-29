// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Monitoring from '../screen/monitoring';
import Reports from '../screen/reports';
import RegistrationPeople from '../screen/registrationPeople';
import Recordings from '../screen/recordings';
import Notifications from '../screen/notifications';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const SIZE_ICONS = 22;

const StackPrincipal = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Monitoring"
        drawerContent={props => <CustomDrawer {...props}/>}
        screenOptions={{
          drawerActiveBackgroundColor: '#ff9900',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -15,
            fontSize: 15,
            fontFamily: 'Roboto-Medium'
          }
        }}
      >
        <Drawer.Screen name="Reports" component={Reports}
          options={{
            title: 'Reportes',
            drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name="document" color={color}/>
          }}
        />
        <Drawer.Screen name="Monitoring" component={Monitoring}
          options={{
            title: 'Monitoreo en Vivo',
            drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name="videocam" color={color}/>
          }}
        />
        <Drawer.Screen name="RegistrationPeople" component={RegistrationPeople}
          options={{
            title: 'Registro de Personas',
            drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name="person-add" color={color}/>
          }}
        />
        <Drawer.Screen name="Recordings" component={Recordings}
          options={{
            title: 'Grabaciones',
            drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name="server" color={color}/>
          }}
        />
        <Drawer.Screen name="Notifications" component={Notifications}
          options={{
            title: 'Notificaciones',
            drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name="notifications" color={color}/>
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StackPrincipal;
