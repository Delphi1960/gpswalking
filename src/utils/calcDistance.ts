import {Coordinate} from '../types/coordLocation.type';

const earthRadius = 6378137;
const toRadius = (value: number): number => (value * Math.PI) / 180;

export const calcDistance = (from: Coordinate, to: Coordinate): number => {
  const distance =
    Math.acos(
      Math.sin(toRadius(to.lat)) * Math.sin(toRadius(from.lat)) +
        Math.cos(toRadius(to.lat)) *
          Math.cos(toRadius(from.lat)) *
          Math.cos(toRadius(from.lon) - toRadius(to.lon)),
    ) * earthRadius;

  return Math.round(convertDistance(distance, 'm'));
};

// Convert to a different unit

const convertDistance = (
  meters: number,
  targetUnit: keyof typeof distanceConversion = 'm',
): number => {
  return distanceConversion[targetUnit] * meters;
};

const distanceConversion = {
  m: 1,
  mi: 1 / 1609.344,
  km: 0.001,
  cm: 100,
  mm: 1000,
};
// }
