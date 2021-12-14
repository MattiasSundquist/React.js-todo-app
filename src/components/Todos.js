import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Todo } from './Todo';

export const Todos = ({ todos, onTodoDelete, onTodoEdit, onTodoCompleteToggle }) => {
  if (todos && todos.length > 0) {
    return (
      <Container align='center'>
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} onTodoDelete={onTodoDelete} onTodoEdit={onTodoEdit} onTodoCompleteToggle={onTodoCompleteToggle} />;
        })}
      </Container>
    );
  } else {
    return (
      <Container align='center'>
        <Typography variant='h6' color='textSecondary'>
          No Todos to display
        </Typography>
      </Container>
    );
  }
};
