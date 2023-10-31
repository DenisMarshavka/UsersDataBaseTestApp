import {ViewProps} from 'react-native';
import {IDob} from '../../../types/models/IUser';

export interface UserCardProps extends ViewProps {
  gender: string;
  name: string;
  email?: string;
  phone?: string;
  picture?: string;
  age?: number;
  dob?: IDob;
  lastUpdated?: string;
  isVisable?: boolean;
  onPress: () => void;
}

export const defaultProps: UserCardProps = {
  gender: '-',
  name: '-',
  age: 1,
  email: undefined,
  phone: undefined,
  picture: undefined,
  dob: undefined,
  lastUpdated: undefined,
  isVisable: true,
  onPress: () => null,
};
