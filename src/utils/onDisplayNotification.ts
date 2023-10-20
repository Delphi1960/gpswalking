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
    vibration: false,
  });

  let time = secondToHMS(second, 'HMS');
  // const notificationId = await notifee.displayNotification({
  await notifee.displayNotification({
    id: '123',
    title: '<p style="color: #0014b7;"><b>TIMER</b></p>🚶',
    subtitle: 'Подзаголовок',
    body: `<p style="color: #0014b7;"><b>Прошло ${time}</b></p>🚶`,

    android: {
      channelId,
      smallIcon: 'ic_launcher',
      largeIcon: require('../assets/images/cherry.jpg'),
      pressAction: {
        id: 'default',
      },
      // actions: [
      //   {
      //     title: '<b>Кнопка 1</b> ',
      //     pressAction: {id: 'test'},
      //   },
      //   {
      //     title: '<p style="color: #f44336;"><b>STOP</b> &#128557;</p>',
      //     pressAction: {id: 'stop'},
      //   },
      // ],
      asForegroundService: true,
      color: AndroidColor.YELLOW,
      colorized: true,
      progress: {
        max: 10,
        current: 5,
        indeterminate: true,
      },
    },
  });
}
