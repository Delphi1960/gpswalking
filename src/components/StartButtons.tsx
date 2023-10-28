import {Button} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
};

export default function StartButtons({onStart, onPause, onStop}: Props) {
  const [startDisabled, setStartDisabled] = useState(false);
  const [pauseDisabled, setPauseDisabled] = useState(true);
  const [stopDisabled, setStopDisabled] = useState(true);

  const handleStartMooving = () => {
    setStartDisabled(true);
    setPauseDisabled(false);
    setStopDisabled(false);
    onStart();
  };
  const handlePauseMooving = () => {
    setStartDisabled(false);
    setPauseDisabled(true);
    onPause();
  };
  const handleStopMooving = () => {
    setStopDisabled(true);
    setPauseDisabled(true);
    setStartDisabled(false);
    onStop();
  };

  return (
    <View style={styles.container}>
      <Button
        disabled={startDisabled}
        buttonStyle={styles.buttonStyle}
        title="Start"
        icon={{
          name: 'play-circle',
          type: 'material-community',
          size: 20,
          color: 'white',
        }}
        onPress={handleStartMooving}
      />
      <View style={styles.space} />
      <Button
        disabled={pauseDisabled}
        buttonStyle={styles.buttonStyle}
        title="Pause"
        icon={{
          name: 'pause-circle',
          type: 'material-community',
          size: 20,
          color: 'white',
        }}
        onPress={handlePauseMooving}
      />
      <View style={styles.space} />
      <Button
        disabled={stopDisabled}
        buttonStyle={styles.buttonStyle}
        title={'Stop'}
        icon={{
          name: 'stop-circle',
          type: 'material-community',
          size: 20,
          color: 'white',
        }}
        onPress={handleStopMooving}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    margin: 5,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
    bottom: 5,
    alignSelf: 'center',
  },
  buttonStyle: {
    margin: 1,
    borderRadius: 5,
    // width: 100,
  },
  space: {
    flex: 0.1,
  },
});
