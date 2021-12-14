import { Container, Zoom } from '@material-ui/core';
import React from 'react';
import { TodoCard } from './TodoCard';

export const Todo = ({ todo, onTodoDelete, onTodoEdit, onTodoCompleteToggle }) => {
  return (
    <Container maxWidth='md' style={{ marginBottom: 10 }}>
      {todo.transitionIN ? (
        <Zoom direction='right' in={true}>
          <div>
            <TodoCard todo={todo} onTodoDelete={onTodoDelete} onTodoEdit={onTodoEdit} onTodoCompleteToggle={onTodoCompleteToggle} />
          </div>
        </Zoom>
      ) : (
        <TodoCard todo={todo} onTodoDelete={onTodoDelete} onTodoEdit={onTodoEdit} onTodoCompleteToggle={onTodoCompleteToggle} />
      )}
    </Container>
  );
};
