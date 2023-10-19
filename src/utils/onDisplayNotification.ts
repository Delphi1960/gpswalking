import notifee, {AndroidColor} from '@notifee/react-native';
import {secondToHMS} from './secondToHMS';

// let notificationId: any;

export async function onDisplayNotification(second: number) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'timer_channel',
    name: 'Timer Channel',
  });

  // if (notificationId) {
  // Если уведомление уже существует, обновляем его
  const notificationId = await notifee.displayNotification({
    id: '123',
    title: '<p style="color: #0014b7;"><b>Timer</span></p></b></p> 🚶',
    body: `<p style="color: #0014b7;"><b>Прошло ${secondToHMS(
      second,
      'HMS',
    )}</b></p>`,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: require('../assets/images/cherry.jpg'),
      pressAction: {
        id: 'default',
      },
      asForegroundService: true,
      color: AndroidColor.YELLOW,
      colorized: true,
    },
  });
  await notifee.displayNotification({
    id: '123',
    title: '<p style="color: #0014b7;"><b>Timer</span></p></b></p> 🚶',
    body: `<p style="color: #0014b7;"><b>Прошло ${secondToHMS(
      second,
      'HMS',
    )}</b></p>`,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: require('../assets/images/cherry.jpg'),
      pressAction: {
        id: 'default',
      },
      asForegroundService: true,
      color: AndroidColor.YELLOW,
      colorized: true,
    },
  });
  // } else {
  //   // Если уведомление не существует, создаем новое
  //   notificationId = await notifee.displayNotification({
  //     title: 'Таймер',
  //     body: `Прошло ${secondToHMS(second, 'HMS')} `,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_launcher',
  //       largeIcon: require('../assets/images/cherry.jpg'),
  //       pressAction: {
  //         id: 'default',
  //       },
  //       asForegroundService: true,
  //       color: AndroidColor.YELLOW,
  //       colorized: true,
  //     },
  //   });
  // }
}
