import React from 'react'

import {withRouterWithQuery, encodeQuery} from "../routerUtils";
import Modal from 'react-bootstrap4-modal'

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
        addModalShown: false,
    };

    render() {
        return <div>
            <TodoListView
                groupId={this.getGroupId()}
                todos={todoLogic.listTodos({groupId: this.getGroupId(), showCompleted: this.state.showCompleted})}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
                onClickAdd={() => this.onAddTodo()}
                onLongClickAdd={() => this.showModal()}
            />
            <AddModal
                visible={this.state.addModalShown}
                onClickBackdrop={() => {this.hideModal()}}
                onAddTodo={() => {this.onAddTodo()}}
                onAddGroup={() => {this.onAddGroup()}}/>
            </div>
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

    onAddTodo() {
        this.hideModal();
        this.props.history.push(encodeQuery("/addTodo", {groupId: this.getGroupId()}))
    }

    onAddGroup() {
        this.hideModal();
        console.log("ADDING GROUP");
    }

    showModal() {
        this.setState({addModalShown: true});
    }

    hideModal() {
        this.setState({addModalShown: false});
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
                <ButtonIcon className="fas fa-plus"/>Add new.....
            </LongClickButton>
        </BorderlessBottomNavbar>
    </div>;

const AddModal = ({visible, onClickBackdrop, onAddTodo, onAddGroup}) =>
    <Modal visible={visible} dialogClassName="modal-dialog-centered" onClickBackdrop={onClickBackdrop}>
        <div className="modal-body">
            <button className="btn btn-block btn-lg btn-secondary" onClick={onAddTodo}>
                Add new todo
            </button>
            <button className="btn btn-block btn-lg btn-secondary" onClick={onAddGroup}>
                Add new group
            </button>
        </div>
</Modal>


