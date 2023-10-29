import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Coordinate} from '../types/coordLocation.type';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';
import {secondToHMS} from '../utils/secondToHMS';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import ResultScreen from './ResultScreen';
import {useMMKVString} from 'react-native-mmkv';

type Props = {};

export default function WatchLocation({}: Props) {
  const [status] = useMMKVString('@status');
  const [location, setLocation] = useState<Coordinate>({lat: 0, lon: 0});

  const [averageCoords, setAverageCoords] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  const timeRef = useRef(0);

  // -----------------------------------------------------
  // TIMER
  const updateTime = useCallback(() => {
    if (status === 'start') {
      timeRef.current += 1;
    }
  }, [status]);

  useEffect(() => {
    if (status === 'stop') {
      timeRef.current = 0;
      setPath(0);
      setDistance(0);
      setAverageCoords([]);
      return;
    }

    let interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [status, updateTime]);

  //watchPosition
  useEffect(() => {
    if (status === 'start') {
      const _watchId = Geolocation.watchPosition(
        position => {
          // const {latitude, longitude} = position.coords;
          setLocation({
            lat: parseFloat(position.coords.latitude.toFixed(5)),
            lon: parseFloat(position.coords.longitude.toFixed(5)),
          });
          setAltitude(position.coords.altitude!);
          setSpeed(position.coords.speed!);
          // console.log(position.coords);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
        },
      );

      if (location.lat > 0 && location.lon > 0) {
        setAverageCoords(prevCoords => [location, ...prevCoords]);
      }

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

      return () => {
        if (_watchId) {
          Geolocation.clearWatch(_watchId);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  //onDisplayNotification
  useEffect(() => {
    onDisplayNotification(secondToHMS(timeRef.current, 'HMS'));
  }, [timeRef]);

  return (
    <ResultScreen
      locationArray={averageCoords}
      time={timeRef.current}
      distance={distance}
      path={path}
      altitude={altitude}
      speed={speed}
    />
  );
}
