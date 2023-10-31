import React, {useEffect, useState} from 'react';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';
import {coords} from '../utils/coordinates';
import {useMMKVString} from 'react-native-mmkv';
import {Coordinate} from '../types/coordLocation.type';
import ResultScreen from './ResultScreen';

const INTERVAL = 50;

export default function TestGoogleMap() {
  const [status, setStatus] = useMMKVString('@status');
  const [time, setTime] = useState(0);
  const [averageCoords, setAverageCoords] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState(0);

  // ------------------------------------------

  useEffect(() => {
    if (status === 'stop') {
      setTime(0);
      setPath(0);
      setDistance(0);
      setAverageCoords([]);
      return;
    }
  }, [status]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (status === 'start') {
        setAverageCoords(prevCoords => [coords[time], ...prevCoords]);
        // console.log(time, coords[time]);
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
        setTime(time + 1);
        if (time >= coords.length - 1) {
          setStatus('pause');
        }
      }
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [averageCoords, path, setStatus, status, time]);

  return (
    <ResultScreen
      location={coords[0]}
      locationArray={averageCoords}
      time={time}
      distance={distance}
      path={path}
    />
  );
}
