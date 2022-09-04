import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

async function GETFCMToken(){
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken);
    if (!fcmtoken){
        try {
            let fcmtoken_ = await messaging().getToken();
            if (fcmtoken_){
                await AsyncStorage.setItem("fcmtoken", fcmtoken_);
            }
        } catch (error) {
            console.log(error, 'error in fcmtoken');
        }
    }
}

const NotificationListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
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
