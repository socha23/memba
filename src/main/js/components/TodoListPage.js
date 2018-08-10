import React from 'react'

import {withRouterWithQuery, LinkWithQuery} from "../routerUtils";

import todoLogic from '../todoLogic'
import TodoList from './TodoList'
import {BrandedNavbar} from './PageTopNavbar'
import {BorderlessBottomNavbar} from "./PageBottomNavbar";
import PageBody from './PageBody'
import ButtonIcon from './ButtonIcon'

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
    };

    render() {
        return <TodoListView
            groupId={this.getGroupId()}
            todos={todoLogic.listTodos({groupId: this.getGroupId(), showCompleted: this.state.showCompleted})}
            showCompleted={this.state.showCompleted}
            onToggleShowCompleted={() => this.onToggleShowCompleted()}
        />
    }

    getGroupId() {
        return this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID
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

export default withRouterWithQuery(TodoListPage)


const TodoListView = ({
                          groupId = todoLogic.ROOT_GROUP_ID,
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
            <TodoList todos={todos}/>
        </PageBody>
        <BorderlessBottomNavbar>
            <LinkWithQuery to="/addTodo" query={{groupId: groupId}} className="btn btn-block btn-lg btn-info">
                <ButtonIcon className="fas fa-plus"/>Add new...
            </LinkWithQuery>
        </BorderlessBottomNavbar>
    </div>
;
