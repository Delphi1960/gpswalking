import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';

type Props = {};

export default function Options({}: Props) {
  const [stateDistanceFilter, setDistanceFilter] =
    useMMKVObject('@distanceFilter');

  return (
    <View>
      <Text>distanceFilter</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDistanceFilter}
        value={String(stateDistanceFilter)}
        placeholder="DistanceFilter"
        keyboardType="numeric"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
