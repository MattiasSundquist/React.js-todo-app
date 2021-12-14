export const SortAscending = (todosCopy, setTodos) => {
  console.log('Sorting todos ascending!');
  todosCopy.sort((a, b) => (a.text.toUpperCase() < b.text.toUpperCase() ? -1 : 1));
  todosCopy.map((todo) => (todo.transitionIN = true));
  setTodos([...todosCopy]);
};

export const SortDescending = (todosCopy, setTodos) => {
  console.log('Sorting todos descending!');
  todosCopy.sort((a, b) => (a.text.toUpperCase() > b.text.toUpperCase() ? -1 : 1));
  todosCopy.map((todo) => (todo.transitionIN = true));
  setTodos([...todosCopy]);
};
