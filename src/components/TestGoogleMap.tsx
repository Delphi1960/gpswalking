import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {secondToHMS} from '../utils/secondToHMS';
import {storage} from '../utils/storage';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import notifee from '@notifee/react-native';
import StartButtons from './StartButtons';
import * as ScopedStorage from 'react-native-scoped-storage';
import {AndroidScoped} from 'react-native-file-access';
import {getTotalDistance} from 'calculate-distance-between-coordinates';
import GoogleMap from './GoogleMap';
import {coords} from '../../coordTest';
import {useTestGoogleMap} from '../utils/useTestGoogleMap';

export default function TestGoogleMap() {
  const [start, setStart] = useState('stop');

  const data = useTestGoogleMap(start);

  useEffect(() => {
    if (start === 'stop') {
      data.averageCoords[0] = coords[0];
    }
    if (data.time > coords.length - 1) {
      pauseButton();
    }
    onDisplayNotification(secondToHMS(data.time, 'HMS'));
  }, [data.averageCoords, data.time, start]);

  const startButton = () => {
    setStart('start');
    storage.set('@start', 'start');
  };
  const pauseButton = () => {
    setStart('pause');
  };
  const stopButton = async () => {
    // setSeconds(0);
    setStart('stop');
    storage.set('@start', 'stop');
    await notifee.stopForegroundService();

    let dirUri = storage.getString('@workDirectory');
    let fileName = 'coordinates.gpx';
    let pathToFile = AndroidScoped.appendPath(dirUri!, fileName);

    const gpxData = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
    ${data.averageCoords
      .map(coord => `<wpt lat="${coord.lat}" lon="${coord.lon}"></wpt>`)
      .join('')}
  </gpx>`;

    await ScopedStorage.deleteFile(pathToFile);
    await ScopedStorage.writeFile(dirUri!, gpxData, fileName, 'utf8');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <GoogleMap averageCoords={data.averageCoords} />
      </View>

      <View style={styles.dataStyle}>
        <Text style={styles.variantStyle}>Test</Text>
        <View style={styles.time}>
          <Text style={styles.textTime}>{secondToHMS(data.time, 'HMS')}</Text>
        </View>

        <View style={styles.data}>
          {data.averageCoords.length > 1 ? (
            <View>
              <Text style={styles.textCoord}>
                lat = {data.averageCoords[1].lat}
                {'  '}lon = {data.averageCoords[1].lon}
              </Text>
              <Text style={styles.textCoord}>
                lat = {data.averageCoords[0].lat}
                {'  '}lon = {data.averageCoords[0].lon}
              </Text>
            </View>
          ) : (
            <Text style={styles.textCoord}>
              lat = undefined
              {'  '}lon = undefined
            </Text>
          )}

          <View style={[styles.data, styles.dataStep]}>
            <Text style={styles.textData}>
              Step = {data.averageCoords.length}
            </Text>
            <Text style={styles.textData}>
              dS = {data.distance.toFixed()} m {'   '}
            </Text>
          </View>
        </View>

        <View style={styles.data}>
          <Text style={styles.textData}>
            Путь = {data.path.toFixed(1)} m {'  '}[S2=
            {getTotalDistance(data.averageCoords, 'km')} km]
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
