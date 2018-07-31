import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'

const Todo = ({todo}) => <div>
    {todo.text}
</div>;

const TodoListView = ({loading, todos}) => loading ?
    <div>Loading...</div> :
    <div> {
        todos.map(todo => <Todo key={todo.id} todo={todo}/>)
    }                                 
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

        fetch("todos", {
            credentials: 'same-origin'
        })
            .then(r => r.json())
            .then(r => {this.setState({loading: false, todos: r})})
    }

    render() {
        return <TodoListView loading={this.state.loading} todos={this.state.todos}/>
    }


}


class Hello extends React.Component {
    state = {
        message: "init"
    };

    componentDidMount() {
        this.setState({
            message: "didMount"
        });

        fetch("currentUser", {
            credentials: 'same-origin'
        })
            .then(r => r.json())
            .then(user => {this.setState({message: "Hello, " + user.fullName + "!"})})

    }

    render() {
        return <div>
            {this.state.message}
            <TodoList/>
        </div>;
    }
}


ReactDOM.render(
    <Hello/>
, document.getElementById('result'));

