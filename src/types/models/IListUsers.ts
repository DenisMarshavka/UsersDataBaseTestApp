import {IUser} from './IUser';

export interface IListUsers {
  results: IUser[];
  info: IListInfo;
}

export interface IListInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}
