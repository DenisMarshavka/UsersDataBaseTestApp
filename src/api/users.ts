import {createApi} from '@reduxjs/toolkit/dist/query/react';

import {baseQuery} from '../utils/common';
import {IListUsers} from '../types/models/IListUsers';

export enum UserApiTagTypes {
  Users = 'Users',
}
export enum UsersSliceTypes {
  getUsers = `${UserApiTagTypes.Users}/getData`,
}

export type TGetUsersParams = {
  page: number;
  perPage: number;
};

const keyApi = 'userApi';
export default createApi({
  reducerPath: keyApi,
  tagTypes: [UserApiTagTypes.Users],
  baseQuery,
  endpoints: build => ({
    getUsers: build.query<IListUsers, TGetUsersParams>({
      query: ({page, perPage}) => ({
        url: `/?page=${page}&results=${perPage}&seed=abc`,
      }),
    }),
  }),
});
