import {
  FlatList,
  ListRenderItem,
  StyleProp,
  ViewStyle,
  ViewToken,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RenderContentDataLayout} from '../../../layouts';
import {IUser} from '../../../types/models/IUser';
import {
  FLAT_LIST_LAZY_LOAD_DATA_CONTENT_END_REACHED_THRESHOLD,
  ScreenNames,
  generateUserName,
  isIos,
} from '../../../utils';
import {MoreDataLoading} from '../../common';
import {UserCard} from '../UserCard';
import {MainStackParamsType} from '../../../navigation/screens/Main/MainStackNavigation';
import {UsersListProps, defaultProps} from './type';

const SCROLL_EVENT_THROTTLE = 16;
const MAX_TO_RENDER_PER_BATCH = 10;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 50;

export const UsersList: React.FC<UsersListProps> = ({
  data,
  isError,
  isAnyDataLoading,
  isFirstRequest,
  isDataLoading,
  isMoreLoading,
  onRefreshData,
  onMoreData,
}): React.ReactElement => {
  const [viewableItems, setViewableItems] = React.useState<number[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamsType>>();

  const renderItemContent = React.useCallback<ListRenderItem<IUser>>(
    ({item, index}): React.ReactElement => {
      return (
        <>
          <UserCard
            onPress={() =>
              navigation.navigate(ScreenNames.UserDetailsInfo, item)
            }
            gender={item.gender}
            name={generateUserName(item)}
            age={item?.dob?.age}
            phone={item.phone}
            email={item.email}
            picture={item?.picture?.large}
            lastUpdated={item?.lastUpdated}
            isVisable={viewableItems.includes(index)}
          />

          {index === data.length - 1 && isMoreLoading ? (
            <MoreDataLoading active />
          ) : null}
        </>
      );
    },
    [data, isMoreLoading, viewableItems, navigation],
  );

  const style = React.useMemo(
    (): StyleProp<ViewStyle> => ({width: '100%'}),
    [],
  );

  const contentContainerStyle = React.useMemo(
    (): StyleProp<ViewStyle> => ({paddingBottom: isIos ? 250 : 220}),
    [],
  );

  const onViewableItemsChanged = React.useRef(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      if (info.viewableItems.length) {
        setViewableItems(_ => {
          const newData = info.viewableItems
            .filter(i => i.isViewable === true)
            .map(i => (i.index != null ? i.index : -1));

          return newData[0] > 0 ? [newData[0] - 1, ...newData] : newData;
        });
      }
    },
  );

  return (
    <RenderContentDataLayout
      error={isError}
      isLoading={isDataLoading}
      isMoreLoading={isMoreLoading}
      refreshData={onRefreshData}
      isEmpty={!data.length && !isFirstRequest}>
      <FlatList<IUser>
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD,
        }}
        keyExtractor={(item, index) =>
          item?.login?.uuid
            ? item.login.uuid
            : item?.id?.name && item?.id?.value
            ? `${item.id.name}-${item.id.value}`
            : item?.id?.name
            ? `${item.id.name}-${index}`
            : item?.id?.value ?? index.toString()
        }
        showsVerticalScrollIndicator={false}
        style={style}
        data={data}
        renderItem={renderItemContent}
        contentContainerStyle={contentContainerStyle}
        onEndReachedThreshold={
          FLAT_LIST_LAZY_LOAD_DATA_CONTENT_END_REACHED_THRESHOLD
        }
        onEndReached={() => !isAnyDataLoading && onMoreData()}
      />
    </RenderContentDataLayout>
  );
};

UsersList.defaultProps = defaultProps;
export default React.memo(UsersList);
