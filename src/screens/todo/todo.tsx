import {database} from 'config/config-firebase';
import React, {useState, useEffect} from 'react';

import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from Realtime Database when the component mounts
  useEffect(() => {
    const onValueChange = database()
      .ref(`/todos`)
      .on('value', snapshot => {
        console.log('todos data: ', snapshot.val());
      });

    return () => database().ref(`/todos`).off('value', onValueChange);
  }, []);

  // Add a new todo to Realtime Database
  const addTodo = async () => {
    try {
      if (newTodo.trim()) {
        const newTodoRef = database().ref('/todos').push();
        const data = await newTodoRef.set({
          title: newTodo,
          completed: false,
        });
        console.log('data', data);

        setNewTodo(''); // Clear the input after adding
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  // Delete a todo from Realtime Database
  const deleteTodo = async id => {
    await database().ref(`/todos/${id}`).remove();
  };

  // Render each Todo item
  const renderTodo = ({item}) => (
    <View style={styles.todoItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />

      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderTodo}
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
