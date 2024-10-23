import * as React from 'react';
import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import LanguageItem from './language-item';
import {SafeAreaView} from 'react-native-safe-area-context';
import Settings from './partials/settings';
import {EmailDomainModal} from 'components/common/email-domain-modal';
import {LotteryText} from 'components';
import {useSharedValue} from 'react-native-reanimated';
import {CodeGenerateModal} from 'components/common/code-generate-modal';

export default () => {
  const price = useSharedValue(145456);

  const [selected, setSelected] = React.useState(null);
  const deleteItem = ({item, index}) => {
    console.log(item, index);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        {/* <FlatList
          data={Languages}
          renderItem={v => (
            <LanguageItem
              {...v}
              selected={selected}
              setSelected={setSelected}
              onClick={deleteItem}
            />
          )}
          keyExtractor={item => item?.id?.toString()}
        /> */}
        <EmailDomainModal />
        <CodeGenerateModal />
        <Settings />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Languages = [
  {id: 1, name: 'English'},
  {id: 2, name: 'Spanish'},
  {id: 3, name: 'French'},
];
