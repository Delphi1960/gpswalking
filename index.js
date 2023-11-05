import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import {storage} from './src/utils/storage';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  // console.log(notification.body);

  if (type === EventType.ACTION_PRESS) {
    await notifee.cancelNotification(notification.id);
  }
});

notifee.registerForegroundService(notification => {
  let status = storage.getString('@status');
  // console.log(status, notification.id);
  return new Promise(async () => {
    if (status === 'start') {
      await notifee.displayNotification({
        id: '123',
        body: notification.body,
        android: {
          ...notification.android,
        },
      });
    } else {
      if (status === 'stop') {
        await notifee.stopForegroundService();
      }
    }
  });
});

AppRegistry.registerComponent(appName, () => App);
