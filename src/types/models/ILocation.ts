import {ITimezone} from './ITimezone';

export interface ILocation {
  street: IStreet;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: ICoordinates;
  timezone: ITimezone;
}

export interface IStreet {
  number: number;
  name: string;
}

export interface ICoordinates {
  latitude: string;
  longitude: string;
}
