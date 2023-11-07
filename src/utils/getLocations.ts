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
  // const start = new Date();

  // let ii = 0;

  if (status === 'start') {
    // две последние координаты
    coords = JSON.parse(storage.getString('@lastCoords')!);
    locationData = JSON.parse(storage.getString('@locationData')!);

    _watchId = Geolocation.watchPosition(
      position => {
        const latitude = parseFloat(position.coords.latitude.toFixed(5));
        const longitude = parseFloat(position.coords.longitude.toFixed(5));
        // console.log(position.coords.altitude);
        // две последние координаты
        coords.unshift({
          lat: latitude,
          lon: longitude,
        });
        if (coords.length > 2) {
          coords.splice(2, 1);
        }

        if (coords.length > 1) {
          distance = parseFloat(
            (
              getDistanceBetweenTwoPoints(coords[1], coords[0], 'km') * 1000
            ).toFixed(0),
          );
        }
        if (locationData.length > 0) {
          lastPath = locationData[0].path;
        }
        // ii = ii + 0.00005;
        locationData.unshift({
          position: {
            lat: latitude,
            lon: longitude,
          },

          altitude: parseFloat(position.coords.altitude?.toFixed(0)!),
          speed: parseFloat(position.coords.speed?.toFixed(0)!),
          stepPoint: distance,
          path: parseFloat((lastPath + distance).toFixed(0)),
          time: parseFloat((position.timestamp / 1000).toFixed(0)),
          // time: parseFloat(
          //   ((position.timestamp - start.getTime()) / 1000).toFixed(0),
          // ),
        });

        storage.set('@lastCoords', JSON.stringify(coords));
        storage.set('@locationData', JSON.stringify(locationData));
        storage.set('@watchId', _watchId.toFixed(0));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: JSON.parse(storage.getString('@distanceFilter')!),
        interval: JSON.parse(storage.getString('@interval')!),
        fastestInterval: 2000,
      },
    );

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }
}
