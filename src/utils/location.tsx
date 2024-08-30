import {Alert, Linking, PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {pick} from 'lodash';
import t from 'locales/use-translation';
import axios from 'axios';
import env from '@/config/config-api';
import {decode} from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
import {
  arrayData,
  hasObjectLength,
  hasTextLength,
  hasValue,
  isEmpty,
} from './condition';
import {definePlatformParam, isAndroidPlatform} from './platform';
import {objectToQueryString} from './string';
export const LATITUDE_DELTA = 0.0043;
export const LONGITUDE_DELTA = 0.0034;

const getLocation = async () => {
  try {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => resolve(position?.coords),
        error => resolve(error),
        {enableHighAccuracy: false, timeout: 20000},
      );
    });
  } catch (e) {
    return null;
  }
};
export const startLocationUpdates = (onSuccess, onError) => {
  Geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    distanceFilter: 10,
  });
};
export const getCurrentLocation2 = (onSuccess, onError) => {
  Geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
  });
};

const askPermissionMessage = {
  title: t('location_permission_declined.title'),
  message: t('location_permission_declined.description'),
};

const askPermission = async () => {
  Alert.alert(
    t('location_permission_declined.title'),
    t('location_permission_declined.description'),
    [
      {
        text: t('location_permission_declined.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('location_permission_declined.open_settings'),
        onPress: () => Linking.openSettings(),
      },
    ],
  );
};

export const requestPermission = async onIosGranted => {
  if (isAndroidPlatform) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      askPermissionMessage,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return askPermission();
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  await Geolocation.requestAuthorization(onIosGranted, askPermission);
  return true;
};

export const getCurrentLocation = async () => {
  try {
    const currentLocationFunction = async () => {
      let location = await getLocation();
      if (!hasObjectLength(location)) return null;
      const currentLocation = {
        ...pick(location, ['latitude', 'longitude']),
        heading: location?.heading,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      };
      return currentLocation;
    };

    const permission = await requestPermission(currentLocationFunction);
    if (!permission) return null;
    return await currentLocationFunction();
  } catch (e) {
    return null;
  }
};

export const getAddressForCoordinate = async (lat, lng) => {
  try {
    await Geocoder.init(env.GOOGLE_MAP_API_KEY);
    const address = await Geocoder.from({lat, lng});
    if (isEmpty(address?.results)) return {};
    return address?.results?.[0];
  } catch (e) {
    console.log(e);
    return {};
  }
};

/**
 * Search address
 * @param q : queryString
 * @returns {*}
 */
export const searchAddress = async (q, cancelToken) => {
  const options = {
    method: 'GET',
    cancelToken: cancelToken.token,
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?${objectToQueryString(
      q,
    )}`,
  };
  const response = await axios(options);
  return arrayData(response?.data?.predictions);
};

/**
 * Fetch location from place id
 * @param q : queryString
 * @returns {*}
 */
export const fetchLocationFromPlaceId = async q => {
  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/details/json?${objectToQueryString(
      q,
    )}`,
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
};

export const getDirections = async (startLoc, destinationLoc) => {
  try {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${env.GOOGLE_MAP_API_KEY}`,
    );
    let respJson = await resp.json();

    if (isEmpty(respJson?.routes)) {
      return [];
    }
    let points = decode(respJson.routes[0].overview_polyline.points);

    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      };
    });
    return coords;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const getDurationOfDirection = async (
  startCoordinate,
  endCoordinate,
) => {
  try {
    if (!isValidCoordinates(startCoordinate)) return null;
    if (!isValidCoordinates(endCoordinate)) return null;

    const startLoc = startCoordinate.latitude + ',' + startCoordinate.longitude;
    const destinationLoc =
      endCoordinate.latitude + ',' + endCoordinate.longitude;
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLoc}&destinations=${destinationLoc}&key=${env.GOOGLE_MAP_API_KEY}`,
    );
    let respJson = await resp.json();
    return respJson?.rows[0]?.elements[0]?.duration?.text;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const getBetweenDirections = async (startCoordinate, endCoordinate) => {
  if (!isValidCoordinates(startCoordinate)) return [];
  if (!isValidCoordinates(endCoordinate)) return [];

  const startLoc = startCoordinate.latitude + ',' + startCoordinate.longitude;
  const destinationLoc = endCoordinate.latitude + ',' + endCoordinate.longitude;

  const coords = await getDirections(startLoc, destinationLoc);
  return [startCoordinate, ...coords, endCoordinate];
};

export const isValidCoordinates = coordinates => {
  if (!hasObjectLength(coordinates)) return false;
  if (!hasValue(coordinates?.latitude)) return false;
  if (!hasValue(coordinates?.longitude)) return false;
  return true;
};

export const getCityStateCountry = address => {
  const addressComponent = address?.address_components;
  let city, country, state;
  for (const component of addressComponent) {
    const componentType = component.types[0];
    switch (componentType) {
      case 'administrative_area_level_3':
        city = component.long_name;
        break;
      case 'locality':
        city = component.long_name;
        break;
      case 'postal_town':
        city = component.long_name;
        break;
      case 'administrative_area_level_1':
        state = component.short_name;
        break;
      case 'country':
        country = component.long_name;
        break;
    }
  }
  if (!hasTextLength(city)) {
    city = state;
    if (!hasTextLength(state)) city = country;
  }
  return {city, state, country};
};

export const formattedCoordinate = address => {
  if (!address) return null;
  if (!hasValue(address?.latitude)) return null;
  if (!hasValue(address?.longitude)) return null;
  return {
    latitude: parseFloat(address.latitude),
    longitude: parseFloat(address.longitude),
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
};

export const fitToCoordinates = async (
  startCoordinate,
  endCoordinate,
  mapRef,
) => {
  const polylineEndToStart = await await getBetweenDirections(
    endCoordinate,
    startCoordinate,
  );

  const marker1 = pick(startCoordinate, ['latitude', 'longitude']);
  const marker2 = pick(endCoordinate, ['latitude', 'longitude']);
  const MARKERS = [marker1, ...polylineEndToStart, marker2];
  const DEFAULT_PADDING = {top: 80, right: 80, bottom: 250, left: 80};

  setTimeout(() => {
    mapRef?.current?.fitToCoordinates?.(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }, definePlatformParam(50));
};

export const getDistanceInRadius = (
  startCoordinates,
  endCoordinates,
  options = {unit: 'mile'},
) => {
  const RADII = {km: 6371, mile: 3960, meter: 6371000, nmi: 3440};

  // convert to radians
  const toRad = function (num) {
    return (num * Math.PI) / 180;
  };

  // convert coordinates to standard format based on the passed format option
  const convertCoordinates = function (format, coordinates) {
    switch (format) {
      case '[lat,lon]':
        return {latitude: coordinates[0], longitude: coordinates[1]};
      case '[lon,lat]':
        return {latitude: coordinates[1], longitude: coordinates[0]};
      case '{lon,lat}':
        return {latitude: coordinates.lat, longitude: coordinates.lon};
      case '{lat,lng}':
        return {latitude: coordinates.lat, longitude: coordinates.lng};
      case 'geojson':
        return {
          latitude: coordinates.geometry.coordinates[1],
          longitude: coordinates.geometry.coordinates[0],
        };
      default:
        return coordinates;
    }
  };

  const R = options?.unit in RADII ? RADII[options?.unit] : RADII.km;
  const start = convertCoordinates(options?.format, startCoordinates);
  const end = convertCoordinates(options?.format, endCoordinates);
  const dLat = toRad(end.latitude - start.latitude);
  const dLon = toRad(end.longitude - start.longitude);
  const lat1 = toRad(start.latitude);
  const lat2 = toRad(end.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  if (options?.threshold) options?.threshold > R * c;
  return R * c;
};

export const hasLocationPermission = async () => {
  if (isAndroidPlatform) {
    const corseLocation = await check(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    const fineLocation = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const backgroundLocation = await check(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    );

    if (backgroundLocation === RESULTS.GRANTED) return true;
    if (corseLocation === RESULTS.GRANTED) return true;
    if (fineLocation === RESULTS.GRANTED) return true;

    return false;
  }
  const alwaysLocation = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
  const whenInLocation = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  if (alwaysLocation === RESULTS.GRANTED) return true;
  if (whenInLocation === RESULTS.GRANTED) return true;

  return false;
};
export const requestLocationPermission = async () => {
  if (isAndroidPlatform) {
    const fineLocation = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    const corseLocation = await request(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    const hasFineLocation = fineLocation === RESULTS.GRANTED;
    const hasCorseLocation = corseLocation === RESULTS.GRANTED;
    return hasFineLocation || hasCorseLocation;
  }

  const alwaysLocation = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
  const whenInLocation = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  const hasAlwaysLocation = alwaysLocation === RESULTS.GRANTED;
  const hasWhenInLocation = whenInLocation === RESULTS.GRANTED;
  return hasAlwaysLocation || hasWhenInLocation;
};
