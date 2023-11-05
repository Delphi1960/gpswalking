import {Coordinate, LocationData} from '../types/coordLocation.type';
import {storage} from './storage';

export function storageInit() {
  let coords: Coordinate[] = [];
  let locationData: LocationData[] = [];
  let distance: number = 0;
  let path: number = 0;

  const checkKeylocation = storage.contains('@location');
  if (checkKeylocation === false) {
    let location: Coordinate = {lat: 0, lon: 0};
    storage.set('@location', JSON.stringify(location));
  }

  const checkKey = storage.contains('@data');
  if (checkKey === false) {
    coords = [];
    storage.set('@data', JSON.stringify(coords));
  }

  const checkKeylocationData = storage.contains('@locationData');
  if (checkKeylocationData === false) {
    locationData = [];
    storage.set('@locationData', JSON.stringify(locationData));
  }

  const checkKeydistance = storage.contains('@distance');
  if (checkKeydistance === false) {
    distance = 0;
    storage.set('@distance', distance);
  }

  const checkKeypath = storage.contains('@path');
  if (checkKeypath === false) {
    path = 0;
    storage.set('@path', path);
  }

  const checkKeydistanceFilter = storage.contains('@distanceFilter');
  if (checkKeydistanceFilter === false) {
    storage.set('@distanceFilter', '0');
  }
}
