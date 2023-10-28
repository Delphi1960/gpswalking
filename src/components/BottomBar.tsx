import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocationVariant1 from './GetLocationVariant1';
// import Map from './Map';
import GetLocationVariant2 from './GetLocationVariant2';
import TestGoogleMap from './TestGoogleMap';

const Tab = createMaterialBottomTabNavigator();

const GetLocationVariant1Route = () => <GetLocationVariant1 />;
const GetLocationVariant2Route = () => <GetLocationVariant2 />;
const TestGoogleMapRoute = () => <TestGoogleMap />;

export default function BottomBar() {
  return (
    <Tab.Navigator
      shifting={false}
      initialRouteName={'TaskContainerRoute'}
      // barStyle={{backgroundColor: theme.colors.primary}}
      // activeColor={theme.colors.tertiary}
      // inactiveColor={theme.colors.black}
    >
      {/*  */}
      <Tab.Screen
        name="GetLocationVariant1Route"
        component={GetLocationVariant1Route}
        options={{
          tabBarLabel: 'Variant1',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="transit-transfer"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="GetLocationVariant2Route"
        component={GetLocationVariant2Route}
        options={{
          tabBarLabel: 'Variant2',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="transit-transfer"
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TestGoogleMapRoute"
        component={TestGoogleMapRoute}
        options={{
          tabBarLabel: 'TestGoogleMap',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="map-marker-path"
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
