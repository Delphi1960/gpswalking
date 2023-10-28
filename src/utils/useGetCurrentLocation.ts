import {useCallback, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Coordinate} from '../types/coordLocation.type';

export function useGetCurrentLocation() {
  const [currentCoords, setCurrentCoords] = useState<Coordinate>({
    lat: 0,
    lon: 0,
  });

  //Получить текущие координаты
  const getCurrentCoordinates = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentCoords({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  getCurrentCoordinates();
  return currentCoords;
}
