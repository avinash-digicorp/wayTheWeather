import axios from 'axios';
import env from 'config/config-api';
import {arrayData, objectToQueryString} from 'utils';
import {LocationTypes} from 'store/common-interface';

const SEARCH_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
const LOCATION_FROM_PLACE_ID_URL =
  'https://maps.googleapis.com/maps/api/place/details/json?';
const OPEN_WEATHER_APP_ID = '7e7d0e6cb114dcdcf626a1f752164774';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

let searchAddressCancelToken = axios.CancelToken.source();

function* autoCancelRunningSearchAddressOngoingRequest() {
  yield searchAddressCancelToken.cancel?.('');
  searchAddressCancelToken = axios.CancelToken.source();
}
export const searchLocation = async (input: string) => {
  await autoCancelRunningSearchAddressOngoingRequest();
  const params = {key: env.GOOGLE_MAP_API_KEY, input};
  const options = {
    method: 'GET',
    cancelToken: searchAddressCancelToken.token,
    url: `${SEARCH_URL}${objectToQueryString(params)}`,
  };
  const response = await axios(options);
  return arrayData(response?.data?.predictions);
};

export const fetchLocationFromPlaceId = async (placeId: string) => {
  try {
    await autoCancelRunningSearchAddressOngoingRequest();
    const params = {
      key: env.GOOGLE_MAP_API_KEY,
      cancelToken: searchAddressCancelToken.token,
      placeid: placeId,
    };
    const options = {
      method: 'GET',
      url: `${LOCATION_FROM_PLACE_ID_URL}${objectToQueryString(params)}`,
    };

    const response = await axios(options);
    const location = response?.data?.result?.geometry?.location;

    if (!location) {
      return null;
    }

    return {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    };
  } catch (e) {}
};

export const fetchWeather = async (location: LocationTypes) => {
  try {
    const params = {
      appid: OPEN_WEATHER_APP_ID,
      lat: location.latitude,
      lon: location.longitude,
    };
    const url = `${WEATHER_API_URL}?${objectToQueryString(params)}`;

    return null;
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {}
};

export const fetchIpInfo = async () => {
  try {
    const res = await axios.get('https://api.ipify.org');
    const ipAddress = res.data;
    if (ipAddress) {
      const url = `https://freeipapi.com/api/json/${ipAddress}`;
      const response = await axios.get(url);
      const data = response.data;
      return data;
    }
  } catch (e) {}
};
