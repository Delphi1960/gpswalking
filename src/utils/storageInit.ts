import {Coordinate, LocationData} from '../types/coordLocation.type';
import {storage} from './storage';

export function storageInit() {
  let coords: Coordinate[] = [];
  let locationData: LocationData[] = [];

  const checkKeylocation = storage.contains('@location');
  if (checkKeylocation === false) {
    let location: Coordinate = {lat: 0, lon: 0};
    storage.set('@location', JSON.stringify(location));
  }

  const checkKey = storage.contains('@lastCoords');
  if (checkKey === false) {
    coords = [];
    storage.set('@lastCoords', JSON.stringify(coords));
  }

  const checkKeylocationData = storage.contains('@locationData');
  if (checkKeylocationData === false) {
    locationData = [];
    storage.set('@locationData', JSON.stringify(locationData));
  }

  const checkKeydistanceFilter = storage.contains('@distanceFilter');
  if (checkKeydistanceFilter === false) {
    storage.set('@distanceFilter', '1');
  }

  const checkKeyinterval = storage.contains('@interval');
  if (checkKeyinterval === false) {
    storage.set('@interval', '5000');
  }
}
