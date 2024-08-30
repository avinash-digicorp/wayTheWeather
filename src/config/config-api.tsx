import {definePlatformParam} from 'utils';

// Production
const BASE_URL = 'https://google.com';

// Staging
// const ENDPOINT = 'https://google.com'

const WEBSITE = BASE_URL;
const ENDPOINT_API = BASE_URL + '/api/v1';

//  KEYS
const GOOGLE_MAP_API_KEY = definePlatformParam('', '');
export default {
  WEBSITE,
  BASE_URL,
  ENDPOINT_API,
  GOOGLE_MAP_API_KEY,
};
