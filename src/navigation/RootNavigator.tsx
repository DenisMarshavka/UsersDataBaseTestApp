import React from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import {AppColors} from '../theme';
import {
  StackNames,
  generateFadeAnimatedTransitionOptions,
  isAndroid10,
  isIos,
} from '../utils';
import {MainStack} from './screens/Main';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamsType = {
  [StackNames.Main]: undefined;
};

const RootStack = createStackNavigator<RootStackParamsType>();

export const RootNavigator: React.FC = () => {
  React.useEffect(() => {
    if (!isIos) {
      SystemNavigationBar.setNavigationColor(AppColors.TRANSPARENT);
      !isAndroid10 &&
        SystemNavigationBar.setNavigationBarDividerColor(AppColors.BACKGROUND);
      SystemNavigationBar.setBarMode('dark');
    }
  }, []);

  const renderStacks = React.useCallback(
    () => (
      <RootStack.Screen
        name={StackNames.Main}
        component={MainStack}
        options={generateFadeAnimatedTransitionOptions}
      />
    ),
    [],
  );

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {renderStacks()}
    </RootStack.Navigator>
  );
};
