import React from 'react';
import {ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';

import {
  PAGINATION_INIT_PAGE,
  PAGINATION_INIT_PER_PAGE,
  ScreenNames,
  filterSomeDataItems,
  getOldUsersData,
  setNewUsersData,
} from '../../../../utils';
import {MainStackParamsType} from '../MainStackNavigation';
import {usersApi} from '../../../../api';
import {IUser} from '../../../../types/models/IUser';
import {UsersList} from '../../../../components/Users';
import {Content} from './styles';
import {ScreenTitle} from '../../../../components/common/styles';

const SCREEN_TITLE = 'Users list';

interface UsersScreenProps extends ViewProps {}
const defaultProps: UsersScreenProps = {};

export const UsersScreen: React.FC<
  UsersScreenProps
> = (): React.ReactElement => {
  const [page, setPage] = React.useState<number>(PAGINATION_INIT_PAGE);
  const [perPage] = React.useState<number>(PAGINATION_INIT_PER_PAGE);

  const [isFirstRequest, setIsFirstRequest] = React.useState<boolean>(true);
  const [isOldStoreUserDataChecking, setIsOldStoreUserDataChecking] =
    React.useState<boolean>(true);
  const [users, setUsers] = React.useState<IUser[]>([]);

  const {params} =
    useRoute<RouteProp<MainStackParamsType, ScreenNames.Users>>();

  React.useEffect(() => {
    if (params) {
      getOldUsersData().then(newUsersData => {
        setUsers(newUsersData);
      });
    }
  }, [params]);

  const {
    refetch,
    data: usersData,
    isError,
    isSuccess,
    isFetching: isGetDataLoading,
  } = usersApi.useGetUsersQuery(
    {
      page: page,
      perPage: perPage,
    },
    {
      skip: isOldStoreUserDataChecking,
    },
  );

  const isLoading = React.useMemo(
    (): boolean => !users.length && isGetDataLoading,
    [isGetDataLoading, users],
  );

  const isDataLoading = React.useMemo(
    (): boolean => isOldStoreUserDataChecking || isFirstRequest || isLoading,
    [isLoading, isFirstRequest, isOldStoreUserDataChecking],
  );

  const isMoreLoading = React.useMemo(
    (): boolean =>
      !!users?.length &&
      !isOldStoreUserDataChecking &&
      !isFirstRequest &&
      isGetDataLoading,
    [users, isGetDataLoading, isOldStoreUserDataChecking, isFirstRequest],
  );

  const isAnyDataLoading = React.useMemo(
    (): boolean => isDataLoading || isMoreLoading,
    [isDataLoading, isMoreLoading],
  );

  const initSetUserData = React.useCallback(async () => {
    const oldData = await getOldUsersData();
    const newPage = oldData.length
      ? Math.ceil(oldData.length / PAGINATION_INIT_PER_PAGE)
      : 1;

    if (!oldData.length) {
      setIsOldStoreUserDataChecking(false);
      return;
    }

    oldData.length && setUsers(oldData);
    setPage(newPage);
    setIsOldStoreUserDataChecking(false);
  }, []);

  React.useEffect(() => {
    isOldStoreUserDataChecking && initSetUserData();
  }, [isOldStoreUserDataChecking, initSetUserData]);

  React.useEffect(() => {
    if (isError) {
      setIsFirstRequest(false);
      setIsOldStoreUserDataChecking(false);
    }
  }, [isError]);

  React.useEffect(() => {
    if (isSuccess && usersData.results.length) {
      getOldUsersData().then(oldUsers => {
        const newData = filterSomeDataItems(
          oldUsers,
          usersData.results.map(item => {
            const existingOldItemDataIndex = oldUsers.findIndex(
              oldItem =>
                oldItem?.uuid &&
                item?.login?.uuid &&
                oldItem.uuid === item.login.uuid,
            );

            return {
              ...item,
              uuid: item?.login?.uuid ?? new Date().toString(),
              lastUpdated:
                existingOldItemDataIndex !== -1
                  ? oldUsers[existingOldItemDataIndex].lastUpdated
                  : new Date().toString(),
            };
          }),
          'uuid',
        ) as IUser[];

        setNewUsersData(newData).then(() => {
          setUsers(oldData => {
            if (!oldData?.length || oldUsers.length) {
              isFirstRequest && setIsFirstRequest(false);
            }

            return newData;
          });
        });
      });
    }
  }, [isSuccess, isFirstRequest, usersData?.results]);

  const handleMoreData = React.useCallback(() => {
    setPage(oldPage => oldPage + 1);
  }, []);

  return (
    <Content>
      <SafeAreaView edges={['top']}>
        <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>
      </SafeAreaView>

      <UsersList
        data={users}
        isError={isError}
        isAnyDataLoading={isAnyDataLoading}
        isFirstRequest={isFirstRequest}
        isDataLoading={isDataLoading}
        isMoreLoading={isMoreLoading}
        onRefreshData={() => {
          refetch();
          setIsOldStoreUserDataChecking(true);
        }}
        onMoreData={handleMoreData}
      />
    </Content>
  );
};

UsersScreen.defaultProps = defaultProps;
export default React.memo(UsersScreen);
