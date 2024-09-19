import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import * as service from './service';
import {IInitialCommonStateProps} from './types';
import {
  getCurrentLocation,
  LATITUDE_DELTA,
  requestLocationPermission,
} from 'utils/location';
import {LocationTypes} from 'store/common-interface';
import {hasLength} from 'utils';

const initialState: IInitialCommonStateProps = {
  location: null,
  fetchingWeather: false,
  weather: null,
  unit: 'metric',
  todo: [],
};

export const searchLocation = createAsyncThunk(
  'common/searchLocation',
  async (params: string) => {
    const response = await service.searchLocation(params);
    return response;
  },
);
export const fetchWeather = createAsyncThunk(
  'common/fetchWeather',
  async (params: LocationTypes) => {
    const response = await service.fetchWeather(params);
    return response;
  },
);
export const fetchCurrentLocation = createAsyncThunk(
  'common/fetchCurrentLocation',
  async () => {
    const location = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA,
    };
    const permission = await requestLocationPermission();
    if (!permission) {
      const ipInfo = await service.fetchIpInfo();
      if (ipInfo.latitude) {
        location.latitude = ipInfo.latitude;
      }
      if (ipInfo.longitude) {
        location.longitude = ipInfo.longitude;
      }
    } else {
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        if (currentLocation?.latitude) {
          location.latitude = currentLocation?.latitude;
        }
        if (currentLocation?.longitude) {
          location.longitude = currentLocation?.longitude;
        }
      }
    }

    return location;
  },
);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<'metric' | 'imperial'>) => {
      state.unit = action.payload;
    },
    addTodo: (state, action) => {
      try {
        if (hasLength(JSON.parse(action?.payload))) {
          const newItems = JSON.parse(action?.payload)?.map(i => ({
            ...i,
            completed: false,
            id: '' + Math.random() + new Date(),
          }));
          state.todo = [...newItems, ...state.todo];
        }
      } catch (e) {}
    },
    completeTodo(state, action) {
      state.todo = state.todo.map(i => {
        if (i.id === action.payload) {
          i.completed = !i.completed;
        }
        return i;
      });
    },
    deleteTodo(state, action) {
      state.todo = state.todo.filter(i => i.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrentLocation.fulfilled, (state, action) => {
      state.location = action.payload;
    }),
      builder.addCase(fetchWeather.pending, state => {
        state.fetchingWeather = true;
      }),
      builder.addCase(fetchWeather.fulfilled, (state, action) => {
        if (!!action.payload) {
          state.weather = action.payload;
        }
      }),
      builder.addCase(fetchWeather.rejected, (state, action) => {
        state.fetchingWeather = false;
      });
  },
});

export const {addTodo, completeTodo, deleteTodo} = commonSlice.actions;

export default commonSlice.reducer;
