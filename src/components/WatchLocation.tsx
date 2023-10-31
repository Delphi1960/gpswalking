import React, {useEffect} from 'react';
import {secondToHMS} from '../utils/secondToHMS';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import ResultScreen from './ResultScreen';
import {useMMKVString} from 'react-native-mmkv';
import {useGetLocations} from '../utils/useGetLocations';

type Props = {};

export default function WatchLocation({}: Props) {
  const [status] = useMMKVString('@status');

  const data = useGetLocations(status!);

  //onDisplayNotification
  useEffect(() => {
    // getLocations(status!);
    onDisplayNotification(secondToHMS(data.time, 'HMS'));
  }, [data.time]);

  useEffect(() => {
    // getLocations();
    // console.log(status);
  }, [status]);
  return (
    <ResultScreen
      // location={location!}
      locationArray={data.coords}
      time={data.time}
      distance={data.distance}
      path={data.path}
      altitude={data.altitude}
      speed={data.speed}
    />
  );
}
