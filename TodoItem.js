
const { InputField } = window.App;

class TodoItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { editable: false };

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({ editable: !this.state.editable });
    }

    render() {
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }

    renderViewMode() {
        const { title, completed, onDelete, onToggle, className } = this.props;

        return (
            <div className={className}>
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => onToggle && onToggle(!completed)}
                    />
                    <div>
                    </div>
                </label>
                <span>{title}</span>
                <button onClick={this.toggleEditMode}>Edit</button>
                <button onClick={() => onDelete && onDelete()}>Del</button>
            </div>
        );
    }

    renderEditMode() {
        const { title, onUpdate } = this.props;
        return (

            <InputField
                className="todoitem-edit"
                value={title}
                onBlur={this.toggleEditMode}
                onKeyDown={(e) => {
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        this.toggleEditMode();
                    }
                }}
                onSubmitEditing={(content) => {
                    onUpdate && onUpdate(content);
                    this.toggleEditMode();
                }}
            />

        );
    }
}

TodoItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
};


window.App.TodoItem = TodoItem;
