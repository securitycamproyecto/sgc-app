import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification, Notifications } from 'react-native-notifications';
import moment from 'moment';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GETFCMToken();
  }
}

async function GETFCMToken() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken);
    if (!fcmtoken) {
        try {
            if (messaging().isDeviceRegisteredForRemoteMessages) {
              await messaging().registerDeviceForRemoteMessages();
            }
            fcmtoken = await messaging().getToken();
            await AsyncStorage.setItem("fcmtoken", fcmtoken);
        } catch (error) {
            console.log(error, 'error in fcmtoken');
        }
    }
}

const NotificationListener = (navigation: any) => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification, remoteMessage.data
        );
        navigation.navigate('Recordings', {screen: 'DetailVideoRecording', params: {recordId: remoteMessage.data?.recordId, clientId: remoteMessage.data?.clientId, title: moment(remoteMessage.data?.title).format('DD/MM/YYYY h:mm:ss a')}, initial: false})
    });

    // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
        }
    });

    messaging().onMessage(async remoteMessage => {
        console.log("notification on fround state....", remoteMessage);
    });
};

export { requestUserPermission, NotificationListener };
