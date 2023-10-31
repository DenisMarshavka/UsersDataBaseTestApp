import {combineReducers} from 'redux';
import {usersApi} from '../api';

export default combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
});
