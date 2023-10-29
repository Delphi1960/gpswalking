import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StartButtons from './StartButtons';
import {
  Coordinate,
  getTotalDistance,
} from 'calculate-distance-between-coordinates';
import {secondToHMS} from '../utils/secondToHMS';
import GoogleMap from './GoogleMap';
import * as ScopedStorage from 'react-native-scoped-storage';
import {AndroidScoped} from 'react-native-file-access';
import notifee from '@notifee/react-native';
import {useMMKVString} from 'react-native-mmkv';

type Props = {
  locationArray: Coordinate[];
  time: number;
  distance: number;
  path: number;
  altitude?: number;
  speed?: number;
};

export default function ResultScreen({
  locationArray,
  time,
  distance,
  path,
  altitude,
  speed,
}: Props) {
  const [, setStatus] = useMMKVString('@status');
  const [dirUri] = useMMKVString('@workDirectory');

  const startButton = () => {
    setStatus('start');
    // storage.set('@start', 'start');
  };
  const pauseButton = () => {
    setStatus('pause');
  };
  const stopButton = async () => {
    // setSeconds(0);
    setStatus('stop');
    // storage.set('@start', 'stop');
    await notifee.stopForegroundService();

    // let dirUri = storage.getString('@workDirectory');
    let fileName = 'coordinates.gpx';
    let pathToFile = AndroidScoped.appendPath(dirUri!, fileName);

    const gpxData = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
      <gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
        ${locationArray
          .map(coord => `<wpt lat="${coord.lat}" lon="${coord.lon}"></wpt>`)
          .join('')}
      </gpx>`;
    // console.log(gpxData);
    await ScopedStorage.deleteFile(pathToFile);
    await ScopedStorage.writeFile(dirUri!, gpxData, fileName, 'utf8');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <GoogleMap coords={locationArray} />
      </View>

      <View style={styles.dataStyle}>
        <View style={styles.time}>
          <Text style={styles.textTime}>{secondToHMS(time, 'HMS')}</Text>
        </View>

        <View style={styles.data}>
          {locationArray.length > 1 ? (
            <View>
              <Text style={styles.textCoord}>
                lat = {locationArray[1].lat}
                {'  '}lon = {locationArray[1].lon}
              </Text>
              <Text style={styles.textCoord}>
                lat = {locationArray[0].lat}
                {'  '}lon = {locationArray[0].lon}
              </Text>
            </View>
          ) : (
            <Text style={styles.textCoord}>
              lat = undefined
              {'  '}lon = undefined
            </Text>
          )}

          <View style={[styles.data, styles.dataStep]}>
            <Text style={styles.textData}>Step = {locationArray.length}</Text>
            <Text style={styles.textData}>
              dS = {distance.toFixed()} m {'   '}
            </Text>
            <Text style={styles.textData}>Высота = {altitude}</Text>
          </View>
        </View>

        <View style={styles.data}>
          <Text style={styles.textData}>
            Путь = {path.toFixed(1)} m {'  '}[S2=
            {getTotalDistance(locationArray, 'km')} km]
          </Text>
          <Text style={styles.textData}>
            {' '}
            {'        '}Скорость = {speed}
          </Text>
        </View>
      </View>

      <StartButtons
        onStart={startButton}
        onPause={pauseButton}
        onStop={stopButton}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F5FCCC',
  },
  mapContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'yellow',
    height: '100%',
  },
  dataStyle: {height: '28%'},

  time: {
    alignItems: 'center',
  },
  textTime: {fontSize: 22, fontWeight: 'bold', color: 'blue'},
  data: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  dataStep: {flexDirection: 'column', marginLeft: 30},
  textCoord: {fontSize: 16, fontWeight: 'bold', color: 'red'},
  textData: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  variantStyle: {fontSize: 12, fontWeight: 'bold', color: 'blue'},
});
