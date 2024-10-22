import React, {useState} from 'react';
import {ButtonView, Text} from 'components';
import {View} from 'react-native';
import Picker from '@react-native-community/datetimepicker';
import {isIosPlatform} from 'utils';
import moment from 'moment';
import colors from 'theme';
import {DateType} from 'store/common-interface';
import {LocalizationKeys} from 'locales/use-translation';

interface IDateTimePickerProps {
  mode?: 'date' | 'time';
  date: DateType;
  onChange: (selectedDate: DateType) => void;
  label: LocalizationKeys;
}

export const DateTimePicker = (props: IDateTimePickerProps) => {
  const ref = React.createRef<any>();
  const {mode, label, date, onChange} = props;
  const [show, setShow] = useState<boolean>(false);

  const onChangeValue = (event: any, selectedDate: any) => {
    try {
      setShow(false);
      const currentDate = moment(selectedDate);
      onChange(currentDate);
      return true;
    } catch (error) {}
  };

  const dateString =
    mode === 'time'
      ? moment(date).format('HH:mm A')
      : moment(date).format('DD MMM YYYY');
  return (
    <View className="items-center justify-between w-full mb-14 flex-row">
      <Text className="text-center text-gray-700 text-lg mb-1" tx={label} />
      <ButtonView
        hide={isIosPlatform}
        onPress={() => setShow(true)}
        className="bg-gray-100 py-2 px-2 rounded-md items-center justify-center">
        <Text className="text-lg text-center" text={dateString} />
      </ButtonView>
      {(show || isIosPlatform) && (
        <Picker
          ref={ref}
          value={date.toDate()}
          mode={mode}
          collapsable
          shouldRasterizeIOS
          onChange={onChangeValue}
          textColor="#12ee41"
          accentColor={colors.primary}
        />
      )}
    </View>
  );
};

DateTimePicker.defaultProps = {
  mode: 'date',
  date: moment(),
  onChange: () => {},
};
