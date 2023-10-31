import * as React from 'react';

import {
  generateFadeAnimatedTransitionOptions,
  initialScreensRouteParams,
  ScreenNames,
} from '../../../utils';
import {UsersScreen} from './Users';
import {UserDetailsInfoScreen} from './UserDetailsInfo';
import {IUser} from '../../../types/models/IUser';
import {createStackNavigator} from '@react-navigation/stack';

export type MainStackParamsType = {
  [ScreenNames.Users]?: IUser;
  [ScreenNames.UserDetailsInfo]?: IUser;
};

const Stack = createStackNavigator<MainStackParamsType>();

const RootStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerTitle: () => null,
    }}>
    <Stack.Screen
      name={ScreenNames.Users}
      component={UsersScreen}
      options={() => ({
        headerShown: false,
        header: () => null,
        ...generateFadeAnimatedTransitionOptions(),
      })}
      initialParams={initialScreensRouteParams[ScreenNames.Users]}
    />
    <Stack.Screen
      name={ScreenNames.UserDetailsInfo}
      component={UserDetailsInfoScreen}
      initialParams={initialScreensRouteParams[ScreenNames.UserDetailsInfo]}
      options={() => ({
        headerShown: false,
        header: () => null,
        ...generateFadeAnimatedTransitionOptions(),
      })}
    />
  </Stack.Navigator>
);

export default React.memo(RootStack);
