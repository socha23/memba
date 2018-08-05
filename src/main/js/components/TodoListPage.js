import React from 'react'
import {Link} from 'react-router-dom'

import todoLogic from '../todoLogic'
import TodoList from './TodoList'
import {BrandedNavbar} from './PageTopNavbar'
import {BorderlessBottomNavbar} from "./PageBottomNavbar";
import PageBody from './PageBody'
import BigMemba from './BigMemba'
import ButtonIcon from './ButtonIcon'

const TodoListView = ({
                          loading = false,
                          todos = [],
                          showCompleted = false,
                          onToggleShowCompleted = () => {},
                      }) =>
    <div>
        <BrandedNavbar>
            <ul className="navbar-nav">
                <li className={"nav-item" + (showCompleted ? " active" : "")} onClick={() => onToggleShowCompleted()}>
                    <i style={{fontSize: 20}} className="nav-link far fa-check-square"/>
                </li>
            </ul>
        </BrandedNavbar>
        <PageBody>
            {loading ? <BigMemba/> : <TodoList todos={todos}/>}
        </PageBody>
        <BorderlessBottomNavbar>
            <Link to="/add" className="btn btn-block btn-lg btn-primary">
                <ButtonIcon className="fas fa-plus"/>Add new...
            </Link>
        </BorderlessBottomNavbar>
    </div>
;

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
    };

    render() {
        return <TodoListView
            loading={todoLogic.areTodosNotLoaded()}
            todos={todoLogic.listTodos({showCompleted: this.state.showCompleted})}
            showCompleted={this.state.showCompleted}
            onToggleShowCompleted={() => this.onToggleShowCompleted()}
        />
    }

    onToggleShowCompleted() {
        this.setState({showCompleted: !this.state.showCompleted})
    }

    componentDidMount() {
        todoLogic.subscribe(this, () => this.incGeneration())
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
    }

    incGeneration() {
        this.setState({generation: this.state.generation + 1})
    }


}

export default TodoListPage