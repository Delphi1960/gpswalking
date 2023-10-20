// taskTimer.ts

import {UpdateTimerCallback} from '../types/typeTimer';

export function taskTimer(onUpdate: UpdateTimerCallback): any {
  let current = 0;

  const interval = setInterval(() => {
    current++;
    onUpdate(current);
  }, 1000);

  return interval;
}
