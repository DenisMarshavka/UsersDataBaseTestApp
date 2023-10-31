import {store} from '../store';
import combinedReducer from './../store/rootReducer';

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
