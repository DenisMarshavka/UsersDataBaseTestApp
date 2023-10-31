import {configureStore} from '@reduxjs/toolkit';
import combinedReducer from './rootReducer';
import storeRegistry from './storeRegistry';
import {usersApi} from '../api';

export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }).concat([usersApi.middleware]),
});

storeRegistry.register(store);
