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

  if (type === EventType.ACTION_PRESS) {
    await notifee.cancelNotification(notification.id);
  }
});

notifee.registerForegroundService(notification => {
  let task = storage.getString('@start');
  // console.log(task, notification.body);
  return new Promise(async () => {
    // notifee.onForegroundEvent(async ({type, detail}) => {
    //   if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
    //     await notifee.stopForegroundService();
    //   }
    // });

    // onUploadTaskEvent(async (event, upload) => {
    if (task === 'start') {
      notifee.displayNotification({
        id: notification.id,
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
  // });
});

AppRegistry.registerComponent(appName, () => App);
