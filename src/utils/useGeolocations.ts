import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState();
  let mounted = true;
  let watchId: any;

  const onEvent = event => {
    if (mounted) {
      const {coords} = event;
      setCoordinates(coords);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(onEvent);
    watchId = Geolocation.watchPosition(onEvent);

    return () => {
      mounted = false;
      Geolocation.clearWatch(watchId);
    };
  }, [0]);

  return coordinates;
};
