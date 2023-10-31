import Geolocation from '@react-native-community/geolocation';
import {storage} from './storage';
import {getDistanceBetweenTwoPoints} from 'calculate-distance-between-coordinates';

interface LocationData {
  lat: number;
  lon: number;
}

export function getLocations() {
  const status = storage.getString('@status');
  let coords: LocationData[] = [];
  let altitude: number = 0;
  let speed: number = 0;
  let distance: number = 0;
  let path: number = 0;
  let _watchId: any;

  if (status === 'start') {
    // const checkKey = storage.contains('@data');
    // if (checkKey === true) {
    //   coords = Object.assign({}, JSON.parse(storage.getString('@data')!));
    //   console.log(coords);
    // } else {
    //   coords = [];
    //   storage.set('@data', JSON.stringify(coords));
    // }

    // coords = JSON.parse(storage.getString('@data')!);

    _watchId = Geolocation.watchPosition(
      position => {
        coords.unshift({
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        });
        altitude = parseFloat(position.coords.altitude?.toFixed(0)!);
        speed = parseFloat(position.coords.speed?.toFixed(0)!);

        if (status === 'start') {
          // storage.set('@data', JSON.stringify(coords));
          storage.set('@id', _watchId);

          let l = coords.length;
          if (l > 1) {
            distance =
              getDistanceBetweenTwoPoints(coords[1], coords[0], 'km') * 1000;
            // setDistance(dist);
            // setPath(path + dist);
            path = path + distance;
          }
          // console.log(status, _watchId);
          console.log(coords);
        }
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

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }
  return {coords, altitude, speed, distance, path};
}
