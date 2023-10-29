import React, {useCallback, useEffect, useState} from 'react';
import {secondToHMS} from '../utils/secondToHMS';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import ResultScreen from './ResultScreen';
import {useMMKVString} from 'react-native-mmkv';
import {Coordinate} from '../types/coordLocation.type';
import Geolocation from '@react-native-community/geolocation';
import {averageGeolocation} from '../utils/averageGeolocation';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';

const INTERVAL = 1000;
const POINT = 5;

export default function GetLocationVariant1() {
  const [status] = useMMKVString('@status');

  const [time, setTime] = useState(0);
  const [currentCoords, setCurrentCoords] = useState<Coordinate[]>([]);
  const [averageCoords, setAverageCoords] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState(0);

  //Получить текущие координаты
  const getCurrentCoordinates = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        // новые значения вперед
        setCurrentCoords(prevCoords => [
          {
            lat: parseFloat(position.coords.latitude.toFixed(5)),
            lon: parseFloat(position.coords.longitude.toFixed(5)),
          },
          ...prevCoords,
        ]);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // ------------------------------------------

  useEffect(() => {
    if (status === 'stop') {
      setTime(0);
      setPath(0);
      setDistance(0);
      setCurrentCoords([]);
      setAverageCoords([]);
      return;
    }

    let interval = setInterval(() => {
      if (status === 'start') {
        setTime(time + 1);

        getCurrentCoordinates();
      }
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [distance, getCurrentCoordinates, path, status, time]);

  // ----------------------------------------------
  useEffect(() => {
    if (currentCoords.length === POINT) {
      setAverageCoords(prevCoords => [
        averageGeolocation(currentCoords),
        ...prevCoords,
      ]);
      setCurrentCoords([]);

      let l = averageCoords.length;
      if (l > 1) {
        let dist =
          getDistanceBetweenTwoPoints(
            averageCoords[1],
            averageCoords[0],
            'km',
          ) * 1000;
        setDistance(dist);
        setPath(path + dist);
      }
    }
  }, [averageCoords, currentCoords, currentCoords.length, path]);

  useEffect(() => {
    onDisplayNotification(secondToHMS(time, 'HMS'));
  }, [time]);

  return (
    <ResultScreen
      locationArray={averageCoords}
      time={time}
      distance={distance}
      path={path}
    />
  );
}
