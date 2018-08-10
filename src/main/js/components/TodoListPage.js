import React from 'react'

import {withRouterWithQuery, encodeQuery} from "../routerUtils";
import Modal from 'react-bootstrap4-modal'

import todoLogic from '../todoLogic'
import TodoList from './TodoList'
import GroupList from './GroupList'
import ButtonIcon from './ButtonIcon'
import LongClickButton from './LongClickButton'
import {BackAndTitle, MembaIconAndTitle, PageTopNavbar, ToolbarButton} from './PageTopNavbar'
import {BorderlessBottomNavbar} from "./PageBottomNavbar";
import PageBody from './PageBody'

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
                groups={todoLogic.listGroups({groupId: this.getGroupId()})}
                todos={todoLogic.listTodos({groupId: this.getGroupId(), showCompleted: this.state.showCompleted})}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
                onClickAdd={() => this.onAddTodo()}
                onLongClickAdd={() => this.showModal()}
                onClickEditGroup={() => this.onEditGroup()}
            />
            <AddModal
                visible={this.state.addModalShown}
                onClickBackdrop={() => {
                    this.hideModal()
                }}
                onAddTodo={() => {
                    this.onAddTodo()
                }}
                onAddGroup={() => {
                    this.onAddGroup()
                }}/>
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

    onEditGroup() {
        this.hideModal();
        this.props.history.push(encodeQuery("/group/" + this.getGroupId(), {groupId: this.getGroupId()}))
    }

    onAddGroup() {
        this.hideModal();
        this.props.history.push(encodeQuery("/addGroup", {groupId: this.getGroupId()}))
    }

    showModal() {
        this.setState({addModalShown: true});
    }

    hideModal() {
        this.setState({addModalShown: false});
    }
}

export default withRouterWithQuery(TodoListPage)

function isRoot(groupId) {
    return groupId === todoLogic.ROOT_GROUP_ID;
}

const TodoListView = ({
                          groupId = todoLogic.ROOT_GROUP_ID,
                          todos = [],
                          groups = [],
                          showCompleted = false,
                          onToggleShowCompleted = () => {},
                          onClickAdd = () => {},
                          onLongClickAdd = () => {},
                          onClickEditGroup = () => {},
                      }) => {
    var navbarFirstElem;
    if (isRoot(groupId)) {
        navbarFirstElem = <MembaIconAndTitle/>;
    } else {
        const group = todoLogic.findGroupById(groupId);
        navbarFirstElem = <BackAndTitle
            query={{groupId: group.groupId || todoLogic.ROOT_GROUP_ID}}
            title={group.text}
        />
    }

    const showCompletedButton = <ToolbarButton
        className="far fa-check-square"
        inactive={!showCompleted}
        onClick={() => onToggleShowCompleted()}
    />;

    const editGroupButton = isRoot(groupId) ? <span/> : <ToolbarButton className="fas fa-cog" onClick={() => onClickEditGroup()}/>;

    return <div>
        <PageTopNavbar>
            {navbarFirstElem}
            <div className="btn-toolbar">
                {editGroupButton}
                {showCompletedButton}
            </div>
        </PageTopNavbar>
        <PageBody>
            <GroupList groups={groups}/>
            <TodoList todos={todos}/>
        </PageBody>
        <BorderlessBottomNavbar>
            <LongClickButton className="btn btn-block btn-lg btn-info" onClick={() => {
                onClickAdd()
            }} onLongClick={() => {
                onLongClickAdd()
            }}>
                <ButtonIcon className="fas fa-plus"/>Add new...
            </LongClickButton>
        </BorderlessBottomNavbar>
    </div>
}

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


