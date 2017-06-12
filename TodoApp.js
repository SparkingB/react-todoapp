
const {
    TodoHeader,
    InputField,
    TodoList
} = window.App;


class TodoApp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [],
            todosSearchBackUp: []
        };
    }
    componentWillMount() {
        fetch('./todos.json')
            .then((response) => response.json())
            .then((todos) => this.setState({ todos: todos }));
    }
    render() {
        const { todos, todosSearchBackUp } = this.state;
        return (
            <div className="container">
                <TodoHeader
                    title="Todo List"
                    todoCount={
                        todos.filter(
                            (todo) => !todo.completed
                        ).length
                    }
                />
                <InputField
                    placeholder="What needs to be done ?"
                    className="textin-field"
                    onSubmitEditing={
                        (title) => this.setState(
                            {
                                todos: _createTodo(todos, title)
                            }
                        )
                    }
                />
                <InputField
                    placeholder="Search ?"
                    className="search-field"
                    onChangeSearch={
                        (content) => {
                            const todosSBK = todosSearchBackUp.length == 0 ? todos : todosSearchBackUp;
                            const todosAry = _search(todosSBK, content, todosSBK);
                            this.setState(
                                {
                                    todos: todosAry[0],
                                    todosSearchBackUp: todosAry[1]
                                }
                            )
                        }
                    }
                />
                <TodoList
                    todos={todos}
                    onDeleteTodo={
                        (id) => this.setState({
                            todos: _deleteTodo(todos, id)
                        })
                    }
                    onToggleTodo={
                        (id, completed) => this.setState({
                            todos: _toggleTodo(todos, id, completed)
                        })
                    }
                    onUpdateTodo={
                        (id, title) => {
                            this.setState({
                                todos: _updateTodo(todos, id, title)
                            })
                        }
                    }
                />
            </div>
        );
    }
}

const _createTodo = (todos, title) => {
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    todos.push(
        {
            id: id,
            title,
            completed: false
        }
    );
    return todos;
};

const _deleteTodo = (todos, id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    if (idx !== -1) todos.splice(idx, 1);
    return todos;
};

const _toggleTodo = (todos, id, completed) => {
    const target = todos.find((todo) => todo.id === id);
    if (target) target.completed = completed;
    return todos;
};

const _updateTodo = (todos, id, title) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    const newTodos = Array.from(todos);
    if (idx!==-1) newTodos[idx].title = title;
    return newTodos;
};

const _search = (todos, content, todosSearchBackUp) => {
    if (content) {
        const targetAry = todos.filter((el) => (el.title.indexOf(content) >= 0 ? true : false));
        return [targetAry, todosSearchBackUp];
    }
    else {
        return [todosSearchBackUp, []];
    }

}

window.App.TodoApp = TodoApp;
