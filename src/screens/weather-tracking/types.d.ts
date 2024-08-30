import {AddressProps} from 'screens/address-select/type';

export interface IWeatherTrackingProps {
  startLocation: AddressProps;
  endLocation: AddressProps;
  loading: boolean;
  onSubmit: () => void;
  setLoading: (loading: boolean) => void;
}
