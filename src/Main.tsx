import React from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import Test from './components/Test';

export default function Main() {
  const requestStoragePermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        // Добавьте другие разрешения здесь, если необходимо
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allPermissionsGranted = Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allPermissionsGranted) {
        // Все разрешения предоставлены
      }
    } catch (err) {}
  };

  requestStoragePermission();

  return (
    <View style={styles.container}>
      {/* <StartTask /> */}
      <Test />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCCC',
  },
});
