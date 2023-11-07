import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';

type Props = {};

export default function Options({}: Props) {
  const [distanceFilter, setDistanceFilter] = useMMKVObject('@distanceFilter');
  const [interval, setInterval] = useMMKVObject('@interval');

  return (
    <View>
      <Text style={styles.text}>DistanceFilter</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDistanceFilter}
        value={String(distanceFilter)}
        placeholder="DistanceFilter"
        keyboardType="numeric"
      />
      <Text style={styles.text}>Interval</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInterval}
        value={String(interval)}
        placeholder="Interval"
        keyboardType="numeric"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  text: {marginLeft: 10},
});
