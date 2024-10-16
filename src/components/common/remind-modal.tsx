import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {Modalize} from 'react-native-modalize';
import {hasObjectLength} from 'utils';

export const RemindModal = ({planExpiryDate}) => {
  const reminders = [7, 3, 1, 0];
  const bottomSheetRef = useRef<Modalize>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [lastOpenedDate, setLastOpenedDate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      checkDaysRemaining();
    }, 1000);
  }, []);

  const checkDaysRemaining = async () => {
    const today = moment().startOf('day'); // Reset time to 00:00:00
    const expiry = moment(planExpiryDate).startOf('day'); // Reset expiry date to 00:00:00
    const days = expiry.diff(today, 'days'); // Compare only the date part
    console.log(days, today);

    const todayDateString = today.format('YYYY-MM-DD');
    if (lastOpenedDate === todayDateString) return;
    const reminder = reminders
      ?.map?.(item => ({day: item}))
      ?.find?.(item => item.day === days);
    if (hasObjectLength(reminder)) {
      const message = generateMessage(reminder?.day ?? -1);
      setTitle(message);
      setIsBottomSheetOpen(true);
      bottomSheetRef.current?.open();
      setLastOpenedDate(todayDateString);
    }
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <Modalize
      withHandle={false}
      ref={bottomSheetRef}
      disableScrollIfPossible
      adjustToContentHeight
      onClose={() => setIsBottomSheetOpen(false)}>
      <View style={styles.bottomSheetContent}>
        <Text style={styles.modalText}>{title}</Text>
        <Text style={styles.modalSubText}>
          Please renew your plan to avoid interruption.
        </Text>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 100,
    width: 100,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
});

const generateMessage = (days = -1) => {
  if (days === 7) {
    return 'Your plan will expire in a week.';
  } else if (days === 3) {
    return 'Your plan will expire in 3 days.';
  } else if (days === 1) {
    return 'Your plan will expire tomorrow.';
  } else if (days === 0) {
    return 'Your plan will expire today.';
  } else if (days < 0) {
    return 'Your plan has expired.';
  } else {
    return `Your plan will expire in ${days} days.`;
  }
};
