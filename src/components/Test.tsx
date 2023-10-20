import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {secondToHMS} from '../utils/secondToHMS';
import {Button} from '@rneui/themed';
import {storage} from '../utils/storage';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import notifee from '@notifee/react-native';

let timerInterval: any = 0;
export default function Test() {
  const [seconds, setSeconds] = useState(0);
  // let notificationId: any;

  function startTask() {
    let sec = 0;
    setSeconds(0);
    // setStart(true);
    storage.set('@start', 'start');
    timerInterval = setInterval(() => {
      sec++;
      setSeconds(sec);
      onDisplayNotification(sec);
    }, 1000);
  }

  async function stopTask() {
    clearInterval(timerInterval);
    setSeconds(0);
    // setStart(false);
    storage.set('@start', 'stop');
    await notifee.stopForegroundService();
  }

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.buttonStyle}
        title={'START' + '\n' + 'foreground service'}
        onPress={() => {
          startTask();
          // onDisplayNotification(seconds);
        }}
      />
      <View style={styles.space} />
      <Button
        buttonStyle={styles.buttonStyle}
        title={'STOP' + '\n' + 'foreground service'}
        onPress={() => {
          stopTask();
        }}
      />
      <View style={styles.space} />
      <Text style={styles.text}>{secondToHMS(seconds, 'HMS')}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCCC',
  },
  space: {
    flex: 0.02,
  },
  text: {fontSize: 28},
  buttonStyle: {
    // backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
    width: 200,
  },
});
