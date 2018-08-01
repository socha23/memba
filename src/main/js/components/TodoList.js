import React from 'react'
import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'

const Todo = ({todo}) => <li className="list-group-item">
    {todo.text}
</li>;

const TodoListView = ({loading, todos}) => loading ?
    <div>Loading...</div> :
    <ul className="list-group"> {
        todos.map(todo => <Todo key={todo.id} todo={todo}/>)
    }                                 
    </ul>;


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