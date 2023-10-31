import React from 'react';
import {RowDetailsInfo} from '..';
import {getDateDifferenceDetails} from '../../../utils';
import {UpdatedLiveTimerProps, defaultProps} from './type';

const LIVE_TIMER_UPDATE_TIME_MS = 1000;

export const UpdatedLiveTimer: React.FC<UpdatedLiveTimerProps> = ({
  updatedDate,
  isLive,
  style,
}): React.ReactElement => {
  const [timeAgo, setTimeAgo] = React.useState<string>('');
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const prevTimerDateRef = React.useRef<string>('');

  React.useEffect(() => {
    if (!prevTimerDateRef.current.trim()) {
      prevTimerDateRef.current = updatedDate;
    }
  }, [updatedDate]);

  const goSetNewTime = React.useCallback(() => {
    setTimeAgo(getDateDifferenceDetails(updatedDate));
  }, [updatedDate]);

  const generateLiveTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    goSetNewTime();
    timerRef.current = setTimeout(generateLiveTimer, LIVE_TIMER_UPDATE_TIME_MS);
  }, [timerRef, goSetNewTime]);

  React.useEffect(() => {
    const closeTimer = () => {
      if (timerRef.current && !isLive) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };

    // For restart timer
    if (prevTimerDateRef.current.trim() !== updatedDate.trim()) {
      prevTimerDateRef.current = updatedDate;

      closeTimer();
      generateLiveTimer();
      return;
    }

    // For start timer
    if (!timerRef.current && isLive) {
      generateLiveTimer();
      return;
    }

    // For stop timer
    if (timerRef.current && !isLive) {
      closeTimer();
    }
  }, [isLive, updatedDate, generateLiveTimer]);

  return <RowDetailsInfo style={style} label="Last updated" text={timeAgo} />;
};

UpdatedLiveTimer.defaultProps = defaultProps;
export default React.memo(UpdatedLiveTimer);
