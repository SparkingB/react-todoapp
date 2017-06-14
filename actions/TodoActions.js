const { ActionTypes } = window.App;

const API_DATA_URL = 'http://localhost:3001/data.json';

window.App.TodoActions = {
  loadTodos() {
    return (dispatch) => {
      fetch(API_DATA_URL)
        .then((response) => response.json())
        .then((todos) => dispatch({
          type: ActionTypes.LOAD_TODOS_SUCCESS,
          todos: [todos, []]
        }));
    };
  },
  createTodo(title) {
    return {
      type: ActionTypes.CREATE_TODO,
      title
    };
  },
  updateTodo(id, title) {
    return {
      type: ActionTypes.UPDATE_TODO,
      id,
      title
    };
  },
  toggleTodo(id, completed) {
    return {
      type: ActionTypes.TOGGLE_TODO,
      id,
      completed
    };
  },
  deleteTodo(id) {
    return {
      type: ActionTypes.DELETE_TODO,
      id
    };
  },
  searchTodo(content) {
    return {
      type: ActionTypes.SEARCH_TODO,
      content
    }
  }
};
