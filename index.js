/**
 * @format
 */

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
  return new Promise(async () => {
    let task = storage.getString('@start');
    // console.log(task, notification.body);
    if (task === 'start') {
      await notifee.displayNotification({
        id: '123',
        body: notification.body,
        android: {
          ...notification.android,
        },
      });
    } else {
      if (task === 'stop') {
        await notifee.stopForegroundService();
      }
    }
  });
});

AppRegistry.registerComponent(appName, () => App);
