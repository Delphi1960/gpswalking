import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useMMKVObject} from 'react-native-mmkv';
import {Coordinate} from '../types/coordLocation.type';

type Props = {
  coords: Coordinate[];
};

export default function GoogleMap({coords}: Props) {
  if (coords === undefined) {
    coords = [];
  }
  const [location] = useMMKVObject<Coordinate>('@location');
  // console.log(location);
  const [region, setRegion] = useState({
    latitude: 46.419668,
    longitude: 30.759625,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        // followsUserLocation={true}
        // showsMyLocationButton={true}
        style={styles.map}
        // initialRegion={{
        //   latitude: 46.419668,
        //   longitude: 30.759625,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
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
            latitude: location?.lat!,
            longitude: location?.lon!,
            // latitude: 46.419668,
            // longitude: 30.759625,
          }}
        />
        <Marker
          key={1}
          title={'Terrain'}
          description={'Terrain'}
          pinColor="green"
          coordinate={{
            latitude: coords.length === 0 ? 0 : coords[0].lat,
            longitude: coords.length === 0 ? 0 : coords[0].lon,
          }}
        />
        <Polyline
          coordinates={coords.map(({lat, lon}) => ({
            latitude: lat,
            longitude: lon,
          }))}
          strokeColor="red" // Цвет линии
          strokeWidth={2} // Ширина линии
        />
      </MapView>
    </View>
  );

  // const [region, setRegion] = useState({
  //   latitude: 46.419668,
  //   longitude: 30.759625,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  // const onRegionChange = newRegion => {
  //   setRegion(newRegion);
  // };

  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       provider={PROVIDER_GOOGLE}
  //       style={styles.map}
  //       initialRegion={region}
  //       zoomEnabled={true}
  //       zoomControlEnabled={true}
  //       mapType="terrain"
  //       showsPointsOfInterest={false}
  //       onRegionChange={onRegionChange}>
  //       <Marker
  //         key={0}
  //         title={'Terrain'}
  //         description={'Terrain'}
  //         coordinate={{
  //           latitude:
  //             coords.length === 0 ? 46.419668 : coords[0].lat,
  //           longitude:
  //             coords.length === 0 ? 30.759625 : coords[0].lon,
  //         }}
  //         // coordinate={{
  //         //   latitude: 46.419668,
  //         //   longitude: 30.759625,
  //         // }}
  //       />
  //       <Polyline
  //         coordinates={coords.map(({lat, lon}) => ({
  //           latitude: lat,
  //           longitude: lon,
  //         }))}
  //         strokeColor="red"
  //         strokeWidth={2}
  //       />
  //     </MapView>
  //   </View>
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
