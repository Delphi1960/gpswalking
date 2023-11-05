import React, {useEffect} from 'react';
import {secondToHMS} from '../utils/secondToHMS';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import ResultScreen from './ResultScreen';
import {useMMKVNumber, useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {useGetLocations} from '../utils/useGetLocations';
import {getLocations} from '../utils/getLocations';
import {LocationData} from '../types/coordLocation.type';

type Props = {};

export default function WatchLocation({}: Props) {
  const [status] = useMMKVString('@status');
  const [locationData] = useMMKVObject<LocationData[]>('@locationData');
  const [distance] = useMMKVString('@distance');
  const [path] = useMMKVNumber('@path');

  const data = useGetLocations(status!);

  useEffect(() => {
    onDisplayNotification(secondToHMS(data.time, 'HMS'));
  }, [data.time]);

  useEffect(() => {
    getLocations();
  }, [status]);

  return (
    <ResultScreen
      // location={location!}
      locationArray={locationData!}
      time={locationData?.length === 0 ? 0 : locationData![0].time}
      distance={Number(distance)}
      path={path!}
      altitude={locationData?.length === 0 ? 0 : locationData![0].altitude}
      speed={locationData?.length! === 0 ? 0 : locationData![0].speed}
    />
    // <ResultScreen
    //   // location={location!}
    //   locationArray={data.coords}
    //   time={data.time}
    //   distance={data.distance}
    //   path={data.path}
    //   altitude={data.altitude}
    //   speed={data.speed}
    // />
  );
}
