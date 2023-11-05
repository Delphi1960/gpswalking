export interface Coordinate {
  lat: number;
  lon: number;
}

export interface LocationData {
  position: Coordinate;
  altitude: number;
  speed: number;
  stepPoint: number;
  path: number;
  time: number;
}
