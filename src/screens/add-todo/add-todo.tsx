// InputScreen.js
import {useNavigation} from '@react-navigation/native';
import {Header} from 'components';
import {routes} from 'navigation';
import React, {useState} from 'react';
import {View, TextInput, Button, Clipboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {addTodo} from 'store/common/slice';

export const AddTodo = () => {
  const [list, setList] = useState('');
  const {todo} = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGenerate = () => {
    dispatch(addTodo(list));
    navigation.navigate(routes.TODO);
  };

  return (
    <View
      className="items-center justify-between flex-1 h-full pb-10"
      style={{padding: 20}}>
      <Header title="Add Todo" />
      <View className="w-full">
        <TextInput
          placeholder="List"
          value={list}
          onChangeText={setList}
          style={{borderBottomWidth: 1, marginBottom: 10, width: '90%'}}
        />
        <Button title="Generate" onPress={handleGenerate} />
      </View>
      <Button
        title={`Todo List (${todo?.length})`}
        onPress={() => navigation.navigate(routes.TODO)}
      />
    </View>
  );
};
