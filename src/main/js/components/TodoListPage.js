import React from 'react'
import {Link} from 'react-router-dom'

import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'
import PageTopNavbar from './PageTopNavbar'
import NavbarBrand from './NavbarBrand'
import PageBody from './PageBody'
import BigMemba from './BigMemba'

const TodoListView = ({loading, todos}) => <div>
        <PageTopNavbar>
            <NavbarBrand/>
            <Link to="/add" className="btn btn-primary">
                Add...
            </Link>
        </PageTopNavbar>
        <PageBody>
            {loading ? <BigMemba/> :
                <ul className="list-group"> {
                    todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)
                }
                </ul>

            }
        </PageBody>
    </div>;

class TodoListPage extends React.Component {
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

export default TodoListPage