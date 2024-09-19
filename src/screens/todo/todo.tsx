import {ButtonView, Header, Text} from 'components';
import React from 'react';

import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {Clipboard} from 'react-native';
import {completeTodo, deleteTodo} from 'store/common/slice';
import {cn} from 'theme';

export const Todo = () => {
  const {todo} = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const complete = id => dispatch(completeTodo(id));
  const deleteItem = id => dispatch(deleteTodo(id));
  let todoList = [...todo];
  const sortedTodo = todoList.sort((a, b) => {
    if (!a.completed && b.completed) {
      return -1;
    }
    if (a.completed && !b.completed) {
      return 11;
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <Header title="Todo" />
      <FlatList
        data={sortedTodo}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <RenderTodo
            key={index}
            item={item}
            complete={complete}
            deleteItem={deleteItem}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
});

const RenderTodo = ({item, complete, deleteItem}) => {
  const isCompleted = item.completed;
  return (
    <View
      className={cn([
        'w-full px-2 py-4 border border-gray-200 rounded-md shadow-md mb-2',
        isCompleted && 'opacity-50',
      ])}>
      <Value label={'title'} text={item?.title} value={item?.title} />
      <Value
        label={'titleHindi'}
        text={item?.titleHindi}
        value={item?.titleHindi}
      />
      <Value label={'tags'} text={item?.tags} value={item?.tags} />
      <Value label={'Prompt'} text={''} value={getPrompt(item.title)} />
      <ButtonView
        onPress={() => deleteItem(item.id)}
        className="w-10/12 mt-2 self-center py-2 bg-white border border-gray-300 rounded-2xl items-center justify-center">
        <Text text={'Delete Todo'} />
      </ButtonView>
      <ButtonView
        onPress={() => complete(item.id)}
        className="w-10/12 mt-2 self-center py-2 bg-white border border-gray-300 rounded-2xl items-center justify-center">
        <Text text={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'} />
      </ButtonView>
    </View>
  );
};

const Value = (props: {value: string; text: string; label: string}) => (
  <ButtonView
    className="flex-row w-full mb-2 items-center justify-between"
    onPress={() => Clipboard.setString(props.value)}>
    <View className="flex-1 flex-row overflow-hidden">
      <Text
        numberOfLines={1}
        text={`${props.label} :`}
        className="text-xs text-gray-700 w-3/12"
      />
      <Text text={props.text} className="text-xs flex-1 text-primary-200" />
    </View>
  </ButtonView>
);

const getPrompt = (
  title: string,
) => `Create a YouTube Short video with a length of 50 to 55 seconds.
Title: "${title}"
The video should:
- Feature a male deep voice in Hindi.
- Provide interesting and practical tips on starting a small side hustle from home.
- Be fast-paced with engaging content.
- Add dynamic subtitles in Hindi.
`;
