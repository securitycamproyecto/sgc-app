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
import { SettingContext } from '../context/SettingContext';

const Drawer = createDrawerNavigator();
const SIZE_ICONS = 22;
const drawerMenuItems = [
  {name: 'Reports', title: 'Reportes', icon:'document', component: Reports},
  {name: 'Monitoring', title: 'Monitoreo en Vivo', icon:'videocam', component: Monitoring},
  {name: 'RegistrationPeople', title: 'Registro de Personas', icon:'person-add', component: RegistrationPeople,
    list: [
      { name: 'RegistrationPeople', title: 'Personas Autorizadas', icon:'happy', component: RegistrationPeople, params: {key: 1, authorize: true} },
      { name: 'RegistrationPeople', title: 'Personas No Autorizadas', icon:'sad', component: RegistrationPeople, params: {key: 2, authorize: false} }
    ]
  },
  {name: 'Recordings', title: 'Grabaciones', icon:'server', component: Recordings},
  {name: 'Notifications', title: 'Notificaciones', icon:'notifications', component: Notifications}
];

const StackPrincipal = () => {
  const { settings } = React.useContext(SettingContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Monitoring"
        drawerContent={props => <CustomDrawer {...props} drawerMenuItems={drawerMenuItems}/>}
        screenOptions={{
          headerTitle: settings.headerTitle,
          headerShown: settings.headerShown,
          headerRight: settings.headerComponent
        }}
      >
        {
          drawerMenuItems.map((item) =>
            <Drawer.Screen name={item.name} component={item.component}
              options={{
                title: item.title,
                drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name={item.icon} color={color}/>
              }}
            />
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StackPrincipal;
