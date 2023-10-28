import {useCallback, useEffect, useState} from 'react';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import {Coordinate} from '../types/coordLocation.type';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';
import {averageGeolocation} from './averageGeolocation';

const INTERVAL = 1000;
const POINT = 5;

export function useTaskTimer(status: string) {
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
      // console.log(time);
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

  return {time, averageCoords, distance, path};
}
