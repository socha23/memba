import React from 'react'
import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'
import AddTodoButton from './AddTodoButton'
import FlexColumn from './FlexColumn'

const TodoListView = ({loading, todos}) => loading ?
    <div>Loading...</div> :
    <FlexColumn style={{minHeight: "100%"}}>
        <AddTodoButton/>
        <ul className="list-group"> {
            todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)
        }
        </ul>
    </FlexColumn>;

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