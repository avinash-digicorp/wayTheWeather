import React from 'react';
import {View} from 'react-native';
import {useWeatherTracking} from './weather-tracking-container';
import {IWeatherTrackingProps} from './types';
import {Header} from 'components';
import MapView from './partials/map-view';

export const WeatherTracking = () => {
  const props: IWeatherTrackingProps = useWeatherTracking();
  return (
    <View className="flex-1">
      <MapView {...props} />
      <Header containerClassName="pl-4" />
    </View>
  );
};

// {"description": "Vartej, Gujarat, India", "location": {"latitude": 21.7405737, "latitudeDelta": 0.0043, "longitude": 72.0631118, "longitudeDelta": 0.0034}, "matched_substrings": [{"length": 5, "offset": 0}], "place_id": "ChIJLxD6KmhRXzkR6Io5FVaCoRw", "reference": "ChIJLxD6KmhRXzkR6Io5FVaCoRw", "structured_formatting": {"main_text": "Vartej", "main_text_matched_substrings": [[Object]], "secondary_text": "Gujarat, India"}, "terms": [{"offset": 0, "value": "Vartej"}, {"offset": 8, "value": "Gujarat"}, {"offset": 17, "value": "India"}], "types": ["locality", "political", "geocode"]}

// {"description": "Vartej Road, Fulsar, Bhavnagar, Gujarat, India", "matched_substrings": [{"length": 6, "offset": 0}], "place_id": "Ei5WYXJ0ZWogUm9hZCwgRnVsc2FyLCBCaGF2bmFnYXIsIEd1amFyYXQsIEluZGlhIi4qLAoUChIJrxwCHiFRXzkRWGlg9aqg1v8SFAoSCS8d2OYhUV85EXO3LZYnj5Zu", "reference": "Ei5WYXJ0ZWogUm9hZCwgRnVsc2FyLCBCaGF2bmFnYXIsIEd1amFyYXQsIEluZGlhIi4qLAoUChIJrxwCHiFRXzkRWGlg9aqg1v8SFAoSCS8d2OYhUV85EXO3LZYnj5Zu", "structured_formatting": {"main_text": "Vartej Road", "main_text_matched_substrings": [[Object]], "secondary_text": "Fulsar, Bhavnagar, Gujarat, India"}, "terms": [{"offset": 0, "value": "Vartej Road"}, {"offset": 13, "value": "Fulsar"}, {"offset": 21, "value": "Bhavnagar"}, {"offset": 32, "value": "Gujarat"}, {"offset": 41, "value": "India"}], "types": ["route", "geocode"]}
