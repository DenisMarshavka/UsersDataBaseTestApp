import React from 'react';
import {LogBox} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import {theme} from './src/theme';
import {RootNavigator} from './src/navigation/RootNavigator';
import {store} from './src/store';

LogBox.ignoreLogs([
  'Module RNConfig requires main queue setup since it overrides `constantsToExport`',
  "Unable to define method 'getConstants()' on NativeModule 'RNConfig'. NativeModule 'RNConfig' already",
]);

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  </ThemeProvider>
);

export default App;
