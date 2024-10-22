import {View, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  BounceInDown,
  CurvedTransition,
  LinearTransition,
} from 'react-native-reanimated';
import {AssetSvg, BaseButton, Text} from 'components';
import colors from 'theme';
import {DomainInput} from './domain-input';
import {
  EmailDomainModalService,
  EmailDomainType,
} from 'components/common/email-domain-modal';
import t from 'locales/use-translation';
import {hasObjectLength} from 'utils';
import moment from 'moment';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
export default ({emails, setEmails}) => {
  const [acceptDomains, setAcceptDomains] = useState(false);
  const addEmailDomain = (data: EmailDomainType) => {
    const isExist = emails?.find(i => i?.id === data?.id);
    if (hasObjectLength(isExist)) {
      setEmails((v: EmailDomainType[]) =>
        v?.map?.((i: EmailDomainType) => (i?.id === data?.id ? data : i)),
      );
      return;
    } else {
      setEmails(v => [...v, data]);
    }
  };
  const onAcceptDomains = (value: boolean) => {
    setAcceptDomains(value);
    if (!value) setEmails([]);
  };
  const removeItem = id => {
    setEmails(v => v.filter(item => item.id !== id));
  };

  const addDomain = values => {
    const id = new Date().getTime().toString();
    const data = hasObjectLength(values) ? values : {id};
    EmailDomainModalService.openModal({onSubmit: addEmailDomain, data});
  };
  return (
    <View>
      <Switch value={acceptDomains} onValueChange={onAcceptDomains} />
      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        data={emails}
        renderItem={({item, index}: {item: EmailDomainType; index: number}) => {
          const isLast = index === emails.length - 1;
          const value = item?.value;
          return (
            <AnimatedButton
              onPress={() => addDomain(item)}
              entering={BounceInDown}
              key={item?.id ?? index}
              style={[styles.container, isLast && styles.noBorder]}>
              <View>
                <Text className="text-primary underline" text={`@${value}`} />
                {item?.hasLimit && <Text text={`Limit : ${item?.limit}`} />}
                <Text
                  text={`Expiry : ${
                    item?.hasExpiry
                      ? moment(item?.endDate).format('YYYY-MM-DD')
                      : 'Never'
                  }`}
                />
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <AssetSvg name="cross" width={20} height={20} />
              </TouchableOpacity>
            </AnimatedButton>
          );
        }}
        keyExtractor={item => item?.id?.toString()}
      />
      {acceptDomains && (
        <Animated.View layout={CurvedTransition}>
          <BaseButton title={'Add Email Domain'} onPress={addDomain} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 15,
    borderColor: colors.grayLight3,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});
