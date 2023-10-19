/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import {storage} from './src/utils/storage';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

notifee.registerForegroundService(notification => {
  return new Promise(async () => {
    let task = storage.getString('@start');
    console.log(task, notification);
    // Long running task...
    if (task === 'start') {
      notifee.displayNotification({
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
