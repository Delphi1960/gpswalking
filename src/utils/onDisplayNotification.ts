import notifee, {AndroidColor} from '@notifee/react-native';

// let notificationId: any;

export async function onDisplayNotification(
  time: string,
  distance: number = 0,
) {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'timer_channel',
    name: 'Timer Channel',
    vibration: false,
  });

  // const notificationId = await notifee.displayNotification({
  try {
    await notifee.displayNotification({
      id: '123',
      title: '<p style="color: #0014b7;"><b>TIMER</b></p>🚶',
      subtitle: 'Подзаголовок',
      body:
        '<p style="color: #0014b7;"><b>' +
        time +
        '</b></p>🚶<p style="color: #0014b7;"><b>' +
        distance +
        ' м</b></p>',

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
  } catch (e) {
    console.log(e);
  }
}
