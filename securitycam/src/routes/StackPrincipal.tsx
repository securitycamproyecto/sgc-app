import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Monitoring from '../screen/monitoring/index';
import Reports from '../screen/reports';
import RegistrationPeople from '../screen/registrationPeople';
import Recordings from '../screen/recordings';
import Manual from '../screen/help/manual';
import Soporte from '../screen/help/soporte';
import Notifications from '../screen/notifications';
import Clients from '../screen/clients';
import Users from '../screen/users';
import Devices from '../screen/devices';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingContext } from '../context/SettingContext';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import services from '../services/api';
import { requestUserPermission } from '../utils/pushnotification_helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const SIZE_ICONS = 22;
const drawerMenuItems = [
  {name: 'Monitoring', title: 'Monitoreo en Vivo', icon:'videocam', component: Monitoring},
  {name: 'Recordings', title: 'Grabaciones', icon:'server', component: Recordings},
  {name: 'RegistrationPeople', title: 'Registro de Personas', icon:'person-add', component: RegistrationPeople,
    list: [
      { name: 'RegistrationPeople', title: 'Personas Autorizadas', icon:'happy', component: RegistrationPeople, params: {key: 1, authorize: true} },
      { name: 'RegistrationPeople', title: 'Personas No Autorizadas', icon:'sad', component: RegistrationPeople, params: {key: 2, authorize: false} }
    ]
  },
  {name: 'Reports', title: 'Reportes', icon:'document', component: Reports},
  {name: 'Notifications', title: 'Notificaciones', icon:'notifications', component: Notifications},
  {name: 'Manual', title: 'Manual', icon:'notifications', component: Manual, ocult: true},
  {name: 'Soporte', title: 'Soporte', icon:'notifications', component: Soporte, ocult: true}
];
const drawerAdminMenuItems = [
  {name: 'Clients', title: 'Clientes', icon:'person', component: Clients},
  {name: 'Users', title: 'Usuarios', icon:'people', component: Users},
  {name: 'Devices', title: 'Dispositivos', icon:'videocam', component: Devices},
];

const StackPrincipal = () => {
  const { settings, setUserId, setNotificationsSettings, setClientId } = React.useContext(SettingContext);
  const [isAdmin, setIsAdmin] = React.useState<undefined|string>(undefined);

  React.useEffect(() => {
    const load = async () => {
      try {
        const { attributes } = await Auth.currentUserInfo();
        setIsAdmin(attributes['custom:isUserAdmin']);
        await requestUserPermission();
        const clientId = await services.getClientByUser(attributes.sub);
        const notificationsConfig: any = await services.getNotificationsConfig(attributes.sub);
        const token = await AsyncStorage.getItem("fcmtoken");
        if (notificationsConfig.data.Items.length === 0) {
          const newNotificationsConfigs = {
            uuid: null,
            authorized: '1',
            notAuthorized: '1',
            unknown: '1',
            token: token,
            clientId: clientId.data
          };
          await services.setNotificationsConfig(null, attributes.sub, newNotificationsConfigs);
          setNotificationsSettings(newNotificationsConfigs);
        } 
        else {
          const options = notificationsConfig.data.Items[0];
          const formattedOptions = {
            uuid: options.id.S,
            authorized: options.authorized.S,
            notAuthorized: options.notAuthorized.S,
            unknown: options.unknown.S,
            token: token,
            clientId: clientId.data
          };
          await services.setNotificationsConfig(formattedOptions.uuid, attributes.sub, formattedOptions);
          setNotificationsSettings(formattedOptions);
        }
        setUserId(attributes.sub);
        setClientId(clientId.data);
        console.log('===STACK===', clientId.data, attributes.sub);
      } catch (err) {
        Alert.alert('Error al obtener configuración del usuario');
      }
    };
    load();
  }, []);

  return (
    <NavigationContainer>
      {
        isAdmin != '1' ?
        <React.Fragment>
          <Drawer.Navigator
            initialRouteName="Monitoring"
            drawerContent={props => <CustomDrawer {...props} drawerMenuItems={drawerMenuItems} viewHelp={true}/>}
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
        </React.Fragment>
        :
        <React.Fragment>
          <Drawer.Navigator
            initialRouteName="Clients"
            drawerContent={props => <CustomDrawer {...props} drawerMenuItems={drawerAdminMenuItems}/>}
            screenOptions={{
              headerTitle: settings.headerTitle,
              headerShown: settings.headerShown,
              headerRight: settings.headerComponent
            }}
          >
            {
              drawerAdminMenuItems.map((item) =>
                <Drawer.Screen name={item.name} component={item.component}
                  options={{
                    title: item.title,
                    drawerIcon: ({color}) => <Ionicons size={SIZE_ICONS} name={item.icon} color={color}/>
                  }}
                />
              )
            }
          </Drawer.Navigator>
        </React.Fragment>
      }
    </NavigationContainer>
  );
};

export default StackPrincipal;
