import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import GetLocation from './GetLocation';
import TestGoogleMap from './TestGoogleMap';
import WatchLocation from './WatchLocation';
import Options from './Options';

const Tab = createMaterialBottomTabNavigator();

// const GetLocationVariant1Route = () => <GetLocation />;
const GetLocationVariant2Route = () => <WatchLocation />;
const TestGoogleMapRoute = () => <TestGoogleMap />;
const OptonsRoute = () => <Options />;

export default function BottomBar() {
  return (
    <Tab.Navigator
      shifting={false}
      initialRouteName={'TaskContainerRoute'}
      // barStyle={{backgroundColor: theme.colors.primary}}
      // activeColor={theme.colors.tertiary}
      // inactiveColor={theme.colors.black}
    >
      <Tab.Screen
        name="GetLocationVariant2Route"
        component={GetLocationVariant2Route}
        options={{
          tabBarLabel: 'Go',
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
        name="OptonsRoute"
        component={OptonsRoute}
        options={{
          tabBarLabel: 'Optons',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={30} />
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
