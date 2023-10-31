import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  Coordinate,
  getDistanceBetweenTwoPoints,
} from 'calculate-distance-between-coordinates';

const INTERVAL = 1000;

export function useGetLocations(status: string) {
  const [location, setLocation] = useState<Coordinate>({lat: 0, lon: 0});
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState(0);
  const [time, setTime] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (status === 'stop') {
      setTime(0);
      setPath(0);
      setDistance(0);
      setCoords([]);
      return;
    }

    let interval = setInterval(() => {
      if (status === 'start') {
        setTime(time + 1);
      }
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [status, time]);

  // -------------------------------------------

  useEffect(() => {
    let _watchId: any;

    if (status === 'start') {
      _watchId = Geolocation.watchPosition(
        position => {
          setLocation({
            lat: parseFloat(position.coords.latitude.toFixed(5)),
            lon: parseFloat(position.coords.longitude.toFixed(5)),
          });
          setAltitude(position.coords.altitude!);
          setSpeed(position.coords.speed!);
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
    }

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, [status]);

  useEffect(() => {
    if (status === 'start' && location.lat > 0 && location.lon > 0) {
      setCoords(prevCoords => [location, ...prevCoords]);
      let l = coords.length;
      if (l > 1) {
        let dist =
          getDistanceBetweenTwoPoints(coords[1], coords[0], 'km') * 1000;
        setDistance(dist);
        setPath(path + dist);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, location]);

  return {time, coords, distance, path, altitude, speed};
}
