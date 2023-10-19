import {MMKV} from 'react-native-mmkv';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';

export const storage = new MMKV();
if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}
