import {Coordinate} from '../types/coordLocation.type';

export function averageGeolocation(coords: Coordinate[]) {
  if (coords.length === 1) {
    return coords[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (let coord of coords) {
    let latitude = (coord.lat * Math.PI) / 180;
    let longitude = (coord.lon * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    lat: parseFloat(((centralLatitude * 180) / Math.PI).toFixed(5)),
    lon: parseFloat(((centralLongitude * 180) / Math.PI).toFixed(5)),
  };
}

// // expect {latitude: 46.41930000000969, longitude: 30.759733333394465}
// const sf = [
//   {
//     latitude: 46.4194,
//     longitude: 30.7597,
//   },
//   {
//     latitude: 46.4193,
//     longitude: 30.7597,
//   },
//   {
//     latitude: 46.4192,
//     longitude: 30.7598,
//   },
// ];

// console.log(averageGeolocation(sf));
