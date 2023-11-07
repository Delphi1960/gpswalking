import React, {useState} from 'react';

import {useMMKVObject} from 'react-native-mmkv';
import {storageInit} from './utils/storageInit';
import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Coordinate} from './types/coordLocation.type';
import * as ScopedStorage from 'react-native-scoped-storage';
import {storage} from './utils/storage';
import GpsImage from './assets/index.image';
import {ActivityIndicator, Button} from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({children}: Props) {
  storageInit();

  const currentPosition = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        setCoord({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        });

        if (position.coords.latitude !== 0 && position.coords.longitude !== 0) {
          setIsLocation(false);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

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
        currentPosition();
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

  const [, setCoord] = useMMKVObject<Coordinate>('@location');

  const [isLocation, setIsLocation] = useState(true);
  requestStoragePermission();
  getWorkingDirectory();

  if (isLocation) {
    return (
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={GpsImage.search} style={styles.image} />
        </View>
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.txt}>Find location...</Text>
        </View>
        <View style={styles.but}>
          <Button
            textColor="red"
            mode="text"
            onPress={() => {
              setIsLocation(false);
            }}>
            Stop Searching for a Place
          </Button>
        </View>
      </View>
    );
  }

  return <>{children}</>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: theme.colors.background,
  },
  indicator: {marginTop: 0},
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
  imageBox: {position: 'absolute', zIndex: 0},
  image: {width: 250, height: 250},
  but: {marginTop: 30},
});
