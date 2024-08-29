import {Moment} from 'moment';

export type LocationTypes = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type DateType = Moment;
