import React from 'react'

import {withRouterWithQuery, encodeQuery} from "../routerUtils";

import todoLogic from '../todoLogic'
import TodoList from './TodoList'
import LongClickButton from './LongClickButton'
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
            onClickAdd={() => this.onClickAdd()}
            onLongClickAdd={() => this.onLongClickAdd()}
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

    onClickAdd() {
        this.props.history.push(encodeQuery("/addTodo", {groupId: this.getGroupId()}))
    }

    onLongClickAdd() {
        console.log("Add clicked looong");
    }
}

export default withRouterWithQuery(TodoListPage)


const TodoListView = ({
                          groupId = todoLogic.ROOT_GROUP_ID,
                          todos = [],
                          showCompleted = false,
                          onToggleShowCompleted = () => {},
                          onClickAdd = () => {},
                          onLongClickAdd = () => {},
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
            <LongClickButton className="btn btn-block btn-lg btn-info" onClick={() => {onClickAdd()}} onLongClick={() => {onLongClickAdd()}}>
                <ButtonIcon className="fas fa-plus"/>Add new...
            </LongClickButton>
        </BorderlessBottomNavbar>
    </div>
;
