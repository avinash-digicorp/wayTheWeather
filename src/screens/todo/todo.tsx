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
// import { firestore } from './firebaseConfig';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from Firestore when the component mounts
  useEffect(() => {
    return;
    const unsubscribe = firestore()
      .collection('todos')
      .onSnapshot(snapshot => {
        const todoList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todoList);
      });

    return () => unsubscribe(); // Cleanup when unmounting
  }, []);

  // Add a new todo to Firestore
  const addTodo = async () => {
    if (newTodo.trim()) {
      await firestore().collection('todos').add({
        title: newTodo,
        completed: false,
      });
      setNewTodo(''); // Clear the input after adding
    }
  };

  // Delete a todo from Firestore
  const deleteTodo = async id => {
    await firestore().collection('todos').doc(id).delete();
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
