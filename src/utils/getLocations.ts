import Geolocation from '@react-native-community/geolocation';
import {storage} from './storage';
import {LocationData} from '../types/coordLocation.type';
import {
  Coordinate,
  getDistanceBetweenTwoPoints,
} from 'calculate-distance-between-coordinates';

export function getLocations() {
  const status = storage.getString('@status');
  let coords: Coordinate[] = [];
  let locationData: LocationData[] = [];
  let _watchId: number;
  let distance: number = 0;
  // let path: number = 0;
  let lastPath: number = 0;
  const start = new Date();

  if (status === 'start') {
    coords = JSON.parse(storage.getString('@data')!);
    locationData = JSON.parse(storage.getString('@locationData')!);
    // path = storage.getNumber('@path')!;

    _watchId = Geolocation.watchPosition(
      position => {
        coords.unshift({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        });
        if (coords.length > 2) {
          coords.splice(2, 1);
        }

        if (coords.length > 1) {
          distance =
            getDistanceBetweenTwoPoints(coords[1], coords[0], 'km') * 1000;
        }
        if (locationData.length > 0) {
          lastPath = locationData[0].path;
        }

        locationData.unshift({
          position: {
            lat: parseFloat(position.coords.latitude.toFixed(5)),
            lon: parseFloat(position.coords.longitude.toFixed(5)),
          },
          altitude: parseFloat(position.coords.altitude?.toFixed(0)!),
          speed: parseFloat(position.coords.speed?.toFixed(0)!),
          stepPoint: distance,
          path: lastPath + distance,
          time: (position.timestamp - start.getTime()) / 1000,
        });

        storage.set('@data', JSON.stringify(coords));
        storage.set('@locationData', JSON.stringify(locationData));
        storage.set('@watchId', _watchId);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: JSON.parse(storage.getString('@distanceFilter')!),
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    // return () => {
    //   if (_watchId) {
    //     Geolocation.clearWatch(_watchId);
    //   }
    // };
  }
}
