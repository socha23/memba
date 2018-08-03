import React from 'react'
import {Link} from 'react-router-dom'

import todoLogic from '../todoLogic'
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
                <table className="table table-dark table-hover" style={{position: "relative", top: -1}}>
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
        generation: 0
    };

    componentDidMount() {
        todoLogic.subscribe(this, () => this.incGeneration())
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
    }

    incGeneration() {
        this.setState({generation: this.state.generation + 1})
    }
    render() {
        return <TodoListView loading={todoLogic.areTodosNotLoaded()} todos={todoLogic.listTodos()}/>
    }
}

export default TodoListPage