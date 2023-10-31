import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../types/models/IUser';
import {checkUsersDataSomeUserIndex} from './common';

const expiresDaysTime = 3600 * 5;

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * expiresDaysTime * 24,
  enableCache: true,
});

export enum storageKeys {
  UsersData = 'usersData',
}

export const setStorageItem = async (
  key: string,
  value: any,
  expires?: number,
): Promise<void> => {
  if (!value) {
    throw new Error(
      '@storage@@setStorageItem@@@value: Passing null/undefined as value is not supported. If you want to remove value, Use .removeSecureItem method instead.',
    );
  }

  try {
    await storage.save({key, data: JSON.stringify({value}), expires});
  } catch (e) {
    console.log('@storage@@setStorageItem', {e});
  }
};

export const getStorageItem = async (
  key: string,
  errorCallback?: (error: any) => void,
): Promise<any | undefined> => {
  if (!key) {
    console.log(`@storage@@getStorageItem: Cannot get item by key '${key}'.`);
  }

  try {
    const item: string | null = await storage.load({key});
    return (item && JSON.parse(item)?.value) || undefined;
  } catch (e) {
    console.log('@storage@@getStorageItem', {e});

    errorCallback && errorCallback(e);
  }
};

export const removeStorageItem = async (key: storageKeys): Promise<void> => {
  try {
    await storage.remove({key});
  } catch (e) {
    console.log('@storage@@removeStorageItem', {e});
  }
};

export const setNewUsersData = async (newData: IUser[]) => {
  try {
    await setStorageItem(storageKeys.UsersData, newData);
  } catch (e) {
    console.log('@storage@@setNewUsersData', {e});
  }
};

export const getOldUsersData = async (): Promise<IUser[]> => {
  try {
    const oldData: IUser[] | undefined = await getStorageItem(
      storageKeys.UsersData,
    );

    return oldData ?? [];
  } catch (e) {
    console.log('@storage@@getOldUsersData', {e});

    return [];
  }
};

export const updateOrAddUserData = async (newItemData: IUser) => {
  try {
    const oldData: IUser[] | undefined = await getOldUsersData();
    const oldUserDataIndex: number = checkUsersDataSomeUserIndex(
      oldData,
      newItemData,
    );
    const newData: IUser[] = oldData ? oldData : [];

    if (!oldData) {
      return;
    }

    if (oldUserDataIndex !== -1) {
      newData[oldUserDataIndex] = newItemData;
    } else {
      newData.push(newItemData);
    }

    await setNewUsersData(newData);
  } catch (e) {
    console.log('@storage@@updateOrAddUserData', {e});
  }
};
