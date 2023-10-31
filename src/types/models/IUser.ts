import {ILocation} from './ILocation';
import {IPicture} from './IPicture';

export type TGenderMaleType = 'male';
export type TGenderFemaleType = 'female';
export type TGenderType = TGenderFemaleType | TGenderMaleType;

export interface IUser {
  gender: TGenderType;
  name: IName;
  location: ILocation;
  email: string;
  login: Login;
  uuid?: string;
  dob: IDob;
  registered: IRegistered;
  phone: string;
  cell: string;
  id: IId;
  picture: IPicture;
  nat: string;
  lastUpdated?: string;
}

export interface IName {
  title: string;
  first: string;
  last: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface IDob {
  date: string;
  age: number;
}

export interface IRegistered {
  date: string;
  age: number;
}

export interface IId {
  name: string;
  value?: string;
}
