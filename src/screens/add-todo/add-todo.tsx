import React from 'react';
import {View} from 'react-native'
import {useAddTodo} from './add-todo-container'
import {Header} from './partials/header'
import {IAddTodoProps} from './types'

export const AddTodo = () => {
  const {loading}: IAddTodoProps = useAddTodo()
  return (
    <View>
      <Header />    
    </View>
  )
}
