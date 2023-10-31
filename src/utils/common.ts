import {StackNavigationOptions} from '@react-navigation/stack';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {Easing} from 'react-native-reanimated';
import * as yup from 'yup';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from 'date-fns';

import {API_DOMAIN_URL, API_SCHEME_URL} from './constants';
import {IUser} from '../types/models/IUser';

const fadeAnimationDuration = 350;
const commonFadeAnimatedTransitionOptionsConfig = {
  duration: fadeAnimationDuration,
  easing: Easing.inOut(Easing.ease),
};

export const generateFadeAnimatedTransitionOptions =
  (): StackNavigationOptions => ({
    gestureEnabled: false,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {...commonFadeAnimatedTransitionOptionsConfig},
      },
      close: {
        animation: 'timing',
        config: {...commonFadeAnimatedTransitionOptionsConfig},
      },
    },
    cardStyleInterpolator: ({current: {progress}}) => ({
      cardStyle: {
        opacity: progress,
      },
    }),
  });

//Redux
export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_SCHEME_URL}${API_DOMAIN_URL}`,
});

export const generateUserName = (data: IUser): string =>
  (data?.name?.title &&
    data?.name?.first &&
    data?.name?.last &&
    `${data.name.title}. ${data.name.first} ${data.name.last}`) ||
  (data?.name?.title &&
    data?.name?.first &&
    `${data.name.title}. ${data.name.first}`) ||
  (data?.name?.title &&
    data?.name?.last &&
    `${data.name.title}. ${data.name.last}`) ||
  (data?.name?.first &&
    data?.name?.last &&
    `${data.name.first} ${data.name.last}`) ||
  (data?.name?.first &&
    data?.name?.last &&
    `${data.name.first} ${data.name.last}`) ||
  data?.name?.title ||
  data?.name?.first ||
  data?.name?.last ||
  '';

export const filterSomeDataItems = (
  oldData: yup.AnyObject[],
  newData: yup.AnyObject[],
  filterKey: string = 'id',
): yup.AnyObject[] => {
  let oldFilteredSomeData = [...oldData];

  newData.forEach((item: yup.AnyObject) => {
    const someOldItemIndex = oldFilteredSomeData.findIndex(
      (oldItem: yup.AnyObject) =>
        oldItem?.[filterKey] !== undefined &&
        oldItem[filterKey] === item[filterKey],
    );
    if (someOldItemIndex > -1) {
      oldFilteredSomeData[someOldItemIndex] = item;
    }
  });

  const newFilteredData = oldFilteredSomeData?.length
    ? newData.filter(
        (item: yup.AnyObject) =>
          item?.[filterKey] !== undefined &&
          !oldFilteredSomeData.some(
            (oldItem: yup.AnyObject) =>
              oldItem?.[filterKey] !== undefined &&
              oldItem[filterKey] === item[filterKey],
          ),
      )
    : newData;

  return [...oldFilteredSomeData, ...newFilteredData];
};

export const getDateDifferenceDetails = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  let result: string = 'now';

  const years = differenceInYears(now, date);
  const months = differenceInMonths(now, date) % 12;
  const days = differenceInDays(now, date) % 30;
  const hours = differenceInHours(now, date) % 24;
  const minutes = differenceInMinutes(now, date) % 60;
  const seconds = differenceInSeconds(now, date) % 60;

  if (years) {
    result = `${years} yrs`;
  }

  if (months) {
    if (result !== 'now') {
      result += ` ${months}mnts`;
    } else {
      result = `${months} months`;
    }
  }

  if (days) {
    if (result !== 'now') {
      result += ` ${days}d`;
    } else {
      result = `${days} days`;
    }
  }

  if (hours) {
    if (result !== 'now') {
      result += ` ${hours}h`;
    } else {
      result = `${hours} hours`;
    }
  }

  if (minutes) {
    if (result !== 'now') {
      result += ` ${minutes}m`;
    } else {
      result = `${minutes} min`;
    }
  }

  if (seconds) {
    if (result !== 'now') {
      result += ` ${seconds}s`;
    } else {
      result = `${seconds} seconds`;
    }
  }

  if (result !== 'now') {
    result += ' ago';
  }

  return result;
};

export const checkUsersDataSomeUserIndex = (
  oldData: IUser[],
  user: IUser,
): number =>
  !!oldData && oldData.length
    ? oldData.findIndex(
        data =>
          (data?.login?.uuid &&
            user?.login?.uuid &&
            data.login.uuid === user.login.uuid) ||
          (data?.id?.value &&
            user?.id?.value &&
            data.id.value === user.id.value),
      )
    : -1;
