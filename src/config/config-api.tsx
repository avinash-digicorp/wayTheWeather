import {definePlatformParam} from 'utils';

// Production
const BASE_URL = 'https://google.com';

// Staging
// const ENDPOINT = 'https://google.com'

const WEBSITE = BASE_URL;
const ENDPOINT_API = BASE_URL + '/api/v1';

//  KEYS
const GOOGLE_MAP_API_KEY = definePlatformParam(
  'AIzaSyBFdK5xM1J-aA0ap5upap3XzolW22Gssj0',
  'AIzaSyBFdK5xM1J-aA0ap5upap3XzolW22Gssj0',
);
export default {
  WEBSITE,
  BASE_URL,
  ENDPOINT_API,
  GOOGLE_MAP_API_KEY,
};
