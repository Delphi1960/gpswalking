import React, {useEffect, useState} from 'react';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';
import {coords} from '../utils/coordinates';
import {useMMKVString} from 'react-native-mmkv';
import {LocationData} from '../types/coordLocation.type';
import ResultScreen from './ResultScreen';

const INTERVAL = 50;

export default function TestGoogleMap() {
  const [status, setStatus] = useMMKVString('@status');
  const [time, setTime] = useState(0);
  const [averageCoords, setAverageCoords] = useState<LocationData[]>([]);
  const [, setDistance] = useState(0);
  const [path, setPath] = useState(0);

  // ------------------------------------------
  // let newCoord: LocationData[] = [];
  // let data: LocationData = {};
  // for (let i = 0; i < coords.length; i++) {
  //   if (i > 0) {
  //     let dist =
  //       getDistanceBetweenTwoPoints(
  //         averageCoords[1].position,
  //         averageCoords[0].position,
  //         'km',
  //       ) * 1000;
  //     data.stepPoint = dist;
  //   } else {
  //     data.stepPoint = 0;
  //   }
  //   data.altitude = coords[i].altitude;
  //   data.position = coords[i].position;
  //   newCoord.push(data);
  // }

  // useEffect(() => {
  //   if (status === 'start') {
  //   }
  // }, [status]);

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
              averageCoords[1].position,
              averageCoords[0].position,
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

  return <ResultScreen locationArray={averageCoords} />;
}
