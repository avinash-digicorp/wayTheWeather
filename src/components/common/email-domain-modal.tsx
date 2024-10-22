import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Switch, Pressable} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {BaseButton} from 'components/base';
import {AssetSvg, DateTimePicker, Text} from 'components';
import {DomainInput} from 'screens/language-list/partials/domain-input';
import {Counter} from './counter';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import moment from 'moment';
import {hasValue, validateDomain} from 'utils';

export type EmailDomainType = {
  value: string;
  hasLimit: boolean;
  limit: number;
  hasExpiry: boolean;
  endDate: moment.Moment;
};
interface DataParams {
  data: EmailDomainType;
  onSubmit: (values: EmailDomainType) => void;
}
export const EmailDomainModal = () => {
  const bottomSheetRef = useRef<Modalize>(null);
  const [value, setValue] = useState('');
  const [data, setData] = useState<DataParams>();
  const [hasLimit, setHasLimit] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [limit, setLimit] = useState(0);
  const [endDate, setEndDate] = useState(moment());
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(new Date().getTime().toString());

  useEffect(() => {
    EmailDomainModalService.setModalReference({open, close});
  }, []);

  const open = (params: DataParams) => {
    setData(params);
    if (hasValue(params?.data?.id)) {
      setIsEdit(true);
      setId(params?.data?.id);
    }
    if (hasValue(params?.data?.value)) {
      setValue(params?.data?.value);
    }
    if (hasValue(params?.data?.hasLimit)) {
      setHasLimit(params?.data?.hasLimit);
    }
    if (hasValue(params?.data?.limit)) {
      setLimit(params?.data?.limit);
    }
    if (hasValue(params?.data?.hasExpiry)) {
      setHasExpiry(params?.data?.hasExpiry);
    }
    if (hasValue(params?.data?.endDate)) {
      setEndDate(params?.data?.endDate);
    }
    bottomSheetRef.current?.open();
  };
  const close = () => {
    bottomSheetRef.current?.close();
    resetData();
  };

  const resetData = () => {
    setIsEdit(false);
    setId(new Date().getTime().toString());
    setValue('');
    setHasLimit(false);
    setHasExpiry(false);
    setLimit(0);
    setEndDate(moment());
  };
  const onSubmit = () => {
    if (data?.onSubmit) {
      const values = {id, value, hasLimit, limit, hasExpiry, endDate};
      data?.onSubmit?.(values);
    }
    close();
  };
  return (
    <Modalize
      withHandle={false}
      ref={bottomSheetRef}
      disableScrollIfPossible
      adjustToContentHeight>
      <Animated.View
        layout={CurvedTransition}
        style={styles.bottomSheetContent}>
        <View className="mb-4 flex-row items-center justify-end">
          <Text
            className="text-xl text-center font-bold flex-1"
            text={isEdit ? 'Edit Domain' : 'Add Domain'}
          />
          <Pressable onPress={close}>
            <AssetSvg name={'cross'} width={24} height={24} />
          </Pressable>
        </View>
        <DomainInput value={value} setValue={setValue} />
        <BaseSwitch value={hasLimit} title="Has limit" setValue={setHasLimit} />
        {hasLimit && <Counter value={limit} setValue={setLimit} />}
        <BaseSwitch
          value={hasExpiry}
          title="Has Expiry"
          setValue={setHasExpiry}
        />
        {hasExpiry && (
          <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
            <DateTimePicker
              label={'Expiry Date'}
              date={endDate}
              onChange={setEndDate}
            />
          </Animated.View>
        )}
        <BaseButton
          disabled={!validateDomain(value)}
          title="Continue"
          onPress={onSubmit}
        />
      </Animated.View>
    </Modalize>
  );
};

const BaseSwitch = ({value, title, setValue}) => {
  return (
    <View className="flex-row my-4 items-center justify-between w-full">
      <Text text={title} />
      <Switch value={value} onValueChange={setValue} />
    </View>
  );
};
const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

class Service {
  modalApply: any;
  constructor() {
    this.modalApply = null;
  }
  setModalReference = (ref: any) => (this.modalApply = ref);
  openModal = (data: DataParams) => this.modalApply?.open(data);
  closeModal = () => this.modalApply?.close();
}

export const EmailDomainModalService = new Service();
