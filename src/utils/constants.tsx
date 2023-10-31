import {MainStackParamsType} from '../navigation/screens/Main/MainStackNavigation';

export const API_SCHEME_URL = 'https://';
export const API_DOMAIN_URL = 'randomuser.me/api';

export const PAGINATION_INIT_PAGE = 1;
export const PAGINATION_INIT_PER_PAGE = 10;
export const PAGINATION_INIT_PER_PAGE_SMALL = 5;
export const FLAT_LIST_LAZY_LOAD_DATA_CONTENT_END_REACHED_THRESHOLD = 0.8;

export const DEFAULT_ACTIVE_OPACITY_BTN = 0.7;

export const defaultErrorMessage = 'Something went wrong';

export const defaultEmptyListMessage = 'The List is empty';
export const fieldRequireMessage = 'The field is required';
export const fieldNotValidMessage = 'The field is not valid';

export enum StackNames {
  Main = 'Main',
}

export enum ScreenNames {
  Users = 'Users',
  UserDetailsInfo = 'UserDetailsInfo',
}

export const initialScreensRouteParams: MainStackParamsType = {
  [ScreenNames.Users]: undefined,
  [ScreenNames.UserDetailsInfo]: undefined,
};
