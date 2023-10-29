import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ScopedStorage from 'react-native-scoped-storage';
import {storage} from './utils/storage';
import BottomBar from './components/BottomBar';
import Geolocation from '@react-native-community/geolocation';
import {Coordinate} from './types/coordLocation.type';
import {useMMKVObject} from 'react-native-mmkv';

export default function Main() {
  const [location, setLocation] = useState<Coordinate>({
    lat: 0,
    lon: 0,
  });
  const [coord, setCoord] = useMMKVObject<Coordinate>('@location');
  const [find, setFind] = useState(false);

  //Получить текущие координаты
  const getCurrentCoordinates = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

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

  const getWorkingDirectory = async () => {
    let dirUri = storage.getString('@workDirectory');

    if (dirUri === undefined) {
      let dir = await ScopedStorage.openDocumentTree(true);
      storage.set('@workDirectory', dir.uri);
    }
  };

  requestStoragePermission();
  getWorkingDirectory();

  useEffect(() => {
    getCurrentCoordinates();
    if (location.lat !== 0 && location.lon !== 0) {
      setFind(true);
      // storage.set('@location', JSON.stringify(location));
      setCoord(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentCoordinates, find, location.lat, location.lon]);

  // console.log(find, location);

  return coord?.lat === 0 || (undefined && coord?.lon === 0) || undefined ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.txt}>Find location...</Text>
    </View>
  ) : (
    <BottomBar />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: theme.colors.background,
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
});
