import React from 'react'
import {Link} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import todoLogic from '../todoLogic'
import TodoItem from './TodoItem'
import {BrandedNavbar} from './PageTopNavbar'
import {BorderlessBottomNavbar} from "./PageBottomNavbar";
import PageBody from './PageBody'
import BigMemba from './BigMemba'

const TodoListView = ({loading, todos}) => {

    var todoElements = todos.map(todo =>
        <TodoItem key={todo.id} todo={todo}/>
    );

    return <div>
        <BrandedNavbar/>
        <PageBody>
            {loading ? <BigMemba/> :
                <div style={{color: "white"}}>
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                        >
                        {todoElements}
                    </ReactCSSTransitionGroup>
                </div>
            }
        </PageBody>
        <BorderlessBottomNavbar>
            <Link to="/add" className="btn btn-block btn-lg btn-primary">
                Add new...
            </Link>
        </BorderlessBottomNavbar>

    </div>
};

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