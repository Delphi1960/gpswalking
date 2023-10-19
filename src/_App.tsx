import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import notifee from '@notifee/react-native';

export default function App() {
  let timerInterval: any;
  let notificationId: any;

  function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      // Обновляем уведомление с текущим значением таймера
      onDisplayNotification(seconds);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  async function onDisplayNotification(seconds: number) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'timer_channel',
      name: 'Timer Channel',
    });

    if (notificationId) {
      // Если уведомление уже существует, обновляем его
      await notifee.displayNotification({
        id: notificationId,
        title: 'Таймер',
        body: `Прошло ${seconds} секунд`,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          largeIcon: require('./src/assets/images/audiobook.png'),
          pressAction: {
            id: 'default',
          },
        },
      });
    } else {
      // Если уведомление не существует, создаем новое
      notificationId = await notifee.displayNotification({
        title: 'Таймер',
        body: `Прошло ${seconds} секунд`,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          largeIcon: require('./src/assets/images/audiobook.png'),
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  }

  async function cancel() {
    stopTimer();
    if (notificationId) {
      await notifee.cancelNotification(notificationId);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Start timer service" onPress={() => startTimer()} />
      <View style={styles.space} />
      <Button
        title="Stop foreground service"
        onPress={() => {
          cancel();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  space: {
    flex: 0.1,
  },
});
