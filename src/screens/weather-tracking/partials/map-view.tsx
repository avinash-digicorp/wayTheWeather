import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {IWeatherTrackingProps} from '../types';
import colors from 'theme';

export default (props: IWeatherTrackingProps) => {
  const ref = useRef<MapView>();
  const {startLocation, endLocation} = props;

  useEffect(() => {
    ref.current?.fitToCoordinates(
      [startLocation?.location, endLocation?.location],
      {edgePadding: {top: 50, right: 50, bottom: 50, left: 50}, animated: true},
    );

    return () => {};
  }, []);

  return (
    <MapView
      ref={ref}
      style={styles.map}
      region={startLocation?.location}
      {...props}>
      <MarkerView coordinate={startLocation?.location} />
      <MarkerView coordinate={endLocation?.location} />
      <Polyline
        strokeWidth={2}
        strokeColors={[colors.gray6]}
        coordinates={[startLocation?.location, endLocation?.location]}
      />
    </MapView>
  );
};

const MarkerView = props => <Marker coordinate={props?.coordinate}></Marker>;
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
