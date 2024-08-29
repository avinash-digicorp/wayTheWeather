import {View} from 'react-native';
import React from 'react';
import {DateTimePicker} from 'components';
import {IHomeProps} from '../home-container';

export default (props: IHomeProps) => {
  const {date, time, setDate, setTime} = props;
  return (
    <View>
      <DateTimePicker label="home.trip_date" date={date} onChange={setDate} />
      <DateTimePicker
        label="home.trip_time"
        mode="time"
        onChange={setTime}
        date={time}
      />
    </View>
  );
};
