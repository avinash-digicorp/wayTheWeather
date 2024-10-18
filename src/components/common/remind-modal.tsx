import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {Modalize} from 'react-native-modalize';
import {getRemainingDays, hasObjectLength} from 'utils';
import {AnimatedIcon} from 'components/animated-icon';
import {BaseButton} from 'components/base';
import {AssetSvg} from 'components/asset-svg';

type PopupTextType = {
  title: string;
  description: string;
};

export const RemindModal = ({planExpiryDate}) => {
  const reminders = [7, 3, 1, 0, -1, -5];
  const bottomSheetRef = useRef<Modalize>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [text, setText] = useState<PopupTextType>({title: '', description: ''});
  const [lastOpenedDate, setLastOpenedDate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      checkDaysRemaining();
    }, 1000);
  }, []);

  const checkDaysRemaining = async () => {
    const today = moment();
    const days = getRemainingDays(planExpiryDate);

    const todayDateString = today.format('YYYY-MM-DD');
    if (lastOpenedDate === todayDateString) return;
    const reminder = reminders
      ?.map?.(item => ({day: item}))
      ?.find?.(item => item.day === days);
    if (hasObjectLength(reminder)) {
      const message: PopupTextType = generateMessage(reminder?.day ?? -1);
      setText(message);
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
        <View className="absolute self-end top-4 right-4">
          <AssetSvg name="cross" />
        </View>
        <AnimatedIcon autoPlay name="crown" style={{width: 200, height: 200}} />
        <Text style={styles.modalText}>{text?.title}</Text>
        <Text style={styles.modalSubText}>{text?.description}</Text>
        <BaseButton title="Continue" onPress={handleClose} />
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
    paddingBottom: 20,
    paddingTop: 10,
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
    width: '80%',
    lineHeight: 25,
  },
});

const generateMessage = (days = -1): PopupTextType => {
  let title = 'Your plan has expired.';
  let description = 'Please renew your plan manually to avoid interruption.';

  if (days < 0) {
    title = 'Your plan has expired.';
  } else if (days === 0) {
    title = 'Your plan will expire today.';
  } else {
    title = `Your plan will expire in ${days} days.`;
    description =
      'Please renew your plan manually after expiration to avoid interruption.';
    if (days === 7) {
      title = 'Your plan will expire in a week.';
    }
    if (days === 1) {
      title = 'Your plan will expire tomorrow.';
    }
  }

  return {title, description};
};
