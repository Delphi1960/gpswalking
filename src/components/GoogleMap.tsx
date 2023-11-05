import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Coordinate, LocationData} from '../types/coordLocation.type';
import {useMMKVObject} from 'react-native-mmkv';

type Props = {
  // coords: Coordinate[];
  coords: LocationData[];
};

export default function GoogleMap({coords}: Props) {
  if (coords === undefined) {
    coords = [];
  }
  const [location] = useMMKVObject<Coordinate>('@location');

  const [region, setRegion] = useState({
    latitude: location!.lat,
    longitude: location!.lon,
    // latitude: 46.419668,
    // longitude: 30.759625,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        // followsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        region={region}
        onRegionChangeComplete={newRegion => setRegion(newRegion)}
        zoomEnabled={true}
        zoomControlEnabled={true}
        mapType="terrain"
        showsPointsOfInterest={false}>
        <Marker
          key={0}
          title={'Terrain'}
          description={'Terrain'}
          coordinate={{
            latitude: location!.lat,
            longitude: location!.lon,
            // latitude: 46.419668,
            // longitude: 30.759625,
          }}
        />
        <Marker
          key={1}
          title={'Terrain'}
          description={'Terrain'}
          pinColor="red"
          coordinate={{
            latitude:
              coords.length === 0 ? location!.lat : coords[0].position.lat,
            longitude:
              coords.length === 0 ? location!.lon : coords[0].position.lon,
          }}
        />
        <Polyline
          coordinates={coords.map(array => ({
            latitude: array.position.lat,
            longitude: array.position.lon,
          }))}
          strokeColor="red" // Цвет линии
          strokeWidth={2} // Ширина линии
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
