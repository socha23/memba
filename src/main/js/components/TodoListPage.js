import React from 'react'
import {Link} from 'react-router-dom'

import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'
import {BrandedNavbar} from './PageTopNavbar'
import PageBody from './PageBody'
import BigMemba from './BigMemba'

const TodoListView = ({loading, todos}) => <div>
        <BrandedNavbar>
            <Link to="/add" className="btn btn-primary">
                Add...
            </Link>
        </BrandedNavbar>
        <PageBody>
            {loading ? <BigMemba/>:
                <table className="table table-dark table-hover">
                    <tbody>
                    {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)
                    }
                    </tbody>
                </table>
            }
        </PageBody>
    </div>;

class TodoListPage extends React.Component {
    state = {
        loading: true,
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