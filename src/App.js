import { Container } from '@material-ui/core';
import { useState, React, useEffect } from 'react';
import { Header } from './components/Header';
import { TodoActions, sortingTypes } from './components/TodoActions';
import { SortAscending, SortDescending } from './components/TodoSorter';
import { TodoForm } from './components/TodoForm';
import { Todos } from './components/Todos';

export const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };
    getTodos();
  }, []);

  /**
   * Fetches all of the Todos from the mock database.
   * @returns All the todos from the mock database.
   */
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const data = await res.json();
    return data;
  };

  /**
   * Fetches one Todo from the mock database.
   * @param {Number} id The id of the todo to fetch.
   * @returns The todo with an id matching the input parameter.
   */
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await res.json();
    return data;
  };

  /**
   * Sorts the todos according to the input parameter.
   * @param {sortingTypes} sortingType What type of sorting to do.
   */
  const sortTodos = (sortingType) => {
    let todosCopy = todos;
    if (sortingType === sortingTypes.ascending) SortAscending(todosCopy, setTodos);
    else if (sortingType === sortingTypes.descending) SortDescending(todosCopy, setTodos);
  };

  /**
   * Edits one Todo's title and description.
   * @param {object} inputTodo The todo to edit.
   * @param {String} newTodoTitle The new title of the Todo.
   * @param {String} newTodoDescription the new description of the Todo.
   */
  const onTodoEdit = async (inputTodo, newTodoTitle, newTodoDescription) => {
    const todoToedit = await fetchTodo(inputTodo.id);
    const updatedTodo = { ...todoToedit, text: newTodoTitle, description: newTodoDescription };

    const res = await fetch(`http://localhost:5000/todos/${inputTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });

    const data = await res.json();

    let todosCopy = todos;
    todosCopy.forEach((todo) => {
      if (todo.id === inputTodo.id) {
        todo.text = data.text;
        todo.description = data.description;
      }
    });
  };

  /**
   * Deletes one Todo.
   * @param {object} inputTodo The todo to delete.
   */
  const onTodoDelete = async (inputTodo) => {
    await fetch(`http://localhost:5000/todos/${inputTodo.id}`, {
      method: 'DELETE'
    });

    let remainingTodos = todos.filter((todo) => todo.id !== inputTodo.id);
    remainingTodos.forEach((todo) => (todo.transitionIN = true));
    setTodos(remainingTodos);
  };

  /**
   * Toggles one Todo's completed status.
   * @param {object} inputTodo The todo to toggle completed on.
   */
  const onTodoCompleteToggle = async (inputTodo) => {
    const todoToToggle = await fetchTodo(inputTodo.id);
    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };

    const res = await fetch(`http://localhost:5000/todos/${inputTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });

    const data = await res.json();

    let todosCopy = todos;
    todosCopy.forEach((todo) => {
      if (todo.id === inputTodo.id) {
        todo.completed = data.completed;
      }
    });
    setTodos([...todosCopy]);
  };

  /**
   * Adds one Todo to the mock database.
   * @param {String} todoText The title of the new Todo.
   * @param {String} todoDescription The description of the new Todo.
   */
  const onTodoAdd = async (todoText, todoDescription) => {
    let todosCopy = todos;
    todosCopy.forEach((todo) => {
      todo.transitionIN = false;
    });

    let newTodo = {
      text: todoText,
      description: todoDescription,
      transitionIN: true,
      completed: false
    };

    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const data = await res.json();
    setTodos([...todosCopy, data]);
  };

  return (
    <Container>
      <Header headerText='Todo app in React.js!' textSize='h2' />
      <TodoForm onTodoAdd={onTodoAdd} />
      <TodoActions sortTodos={sortTodos} />
      <Container>
        <Todos todos={todos} onTodoDelete={onTodoDelete} onTodoEdit={onTodoEdit} onTodoCompleteToggle={onTodoCompleteToggle} />
      </Container>
    </Container>
  );
};
