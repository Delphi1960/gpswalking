import {useEffect, useState} from 'react';
// import Geolocation from 'react-native-geolocation-service';
import {Coordinate} from '../types/coordLocation.type';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';
import {coords} from '../../coordTest';

const INTERVAL = 500;

export function useTestGoogleMap(status: string) {
  const [time, setTime] = useState(0);
  const [averageCoords, setAverageCoords] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState(0);

  // ------------------------------------------

  useEffect(() => {
    // if (status === 'stop') {
    //   setTime(0);
    //   setPath(0);
    //   setDistance(0);
    //   setAverageCoords([]);
    //   return;
    // }

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
      } else {
        if (status === 'stop') {
          setTime(0);
          setPath(0);
          setDistance(0);
          setAverageCoords([]);
          return;
        }
      }
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [averageCoords, path, status, time]);

  return {time, averageCoords, distance, path};
}
