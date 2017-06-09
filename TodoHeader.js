


class TodoHeader extends React.Component {
    render() {
        //name (待辦清單名稱), todoCount (待辦數量) 
        const { title, todoCount } = this.props;
        return (
            <div className="header">
                <div id="header-title">{title}</div>
                <div id="header-todo-count">
                    <span>Unfinished Items : </span>
                    <span id="header-todo-count-number">{todoCount}</span>
                </div>
            </div>
        );
    }
}


TodoHeader.defaultProps = {
    title: '待辦清單(Default)',
    todoCount: 0,
};

TodoHeader.propTypes = {
    title: React.PropTypes.string,
    todoCount: React.PropTypes.number
};

window.App.TodoHeader = TodoHeader;
