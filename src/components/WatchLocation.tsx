import React, {useEffect} from 'react';
import {secondToHMS} from '../utils/secondToHMS';
import {onDisplayNotification} from '../utils/onDisplayNotification';
import ResultScreen from './ResultScreen';
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {getLocations} from '../utils/getLocations';
import {LocationData} from '../types/coordLocation.type';

type Props = {};

export default function WatchLocation({}: Props) {
  const [status] = useMMKVString('@status');
  const [locationData] = useMMKVObject<LocationData[]>('@locationData');

  // const data = useGetLocations(status!);

  useEffect(() => {
    onDisplayNotification(
      secondToHMS(
        locationData?.length === 0 ? 0 : locationData![0].time,
        'HMS',
      ),
    );
  }, [locationData]);

  useEffect(() => {
    getLocations();
  }, [status]);

  return locationData !== undefined ? (
    <ResultScreen locationArray={locationData!} />
  ) : null;
}
