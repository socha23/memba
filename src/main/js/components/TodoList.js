import React from 'react'
import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'
import AddTodoButton from './AddTodoButton'

const TodoListView = ({loading, todos}) => loading ?
    <div>Loading...</div> :
    <div style={{
        display: "flex",
        flexDirection: "column"


    }}>
        <AddTodoButton/>
        <ul className="list-group"> {
            todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)
        }
        </ul>

    </div>;
        
class TodoList extends React.Component {
    state = {
        loading: false,
        todos: []
    };

    componentDidMount() {
        this.reload();
    }

    reload() {
        this.setState({
            loading: true
        });
        jsonGet("/todos")
            .then(r => {this.setState({loading: false, todos: r})});         
    }

    render() {
        return <TodoListView loading={this.state.loading} todos={this.state.todos}/>
    }
}

export default TodoList