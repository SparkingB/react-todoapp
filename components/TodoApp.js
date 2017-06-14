const {
    TodoHeader,
    InputField,
    TodoList,
    TodoActions
} = window.App;

const { connect } = ReactRedux;



class TodoApp extends React.Component {

    componentWillMount() {
        this.props.loadTodos();
    }
    render() {
        const {
            todos,
            createTodo,
            updateTodo,
            toggleTodo,
            deleteTodo,
            searchTodo
        } = this.props;

        return (
            <div className="container">
                <TodoHeader
                    title="Todo List"
                    todoCount={
                        todos[0].filter(
                            (todo) => !todo.completed
                        ).length
                    }
                />
                <InputField
                    placeholder="What needs to be done ?"
                    className="textin-field"
                    onSubmitEditing={createTodo}
                />

                <InputField
                    placeholder="Search ?"
                    className="search-field"
                    onChangeSearch={searchTodo}
                />

                <TodoList
                    todos={todos}
                    onDeleteTodo={deleteTodo}
                    onToggleTodo={toggleTodo}
                    onUpdateTodo={updateTodo}
                />
            </div>
        );
    }
}

window.App.TodoApp = connect(
    (state) => ({ todos: state.todos }),
    {
        loadTodos: TodoActions.loadTodos,
        createTodo: TodoActions.createTodo,
        updateTodo: TodoActions.updateTodo,
        toggleTodo: TodoActions.toggleTodo,
        deleteTodo: TodoActions.deleteTodo,
        searchTodo: TodoActions.searchTodo
    }
)(TodoApp);




