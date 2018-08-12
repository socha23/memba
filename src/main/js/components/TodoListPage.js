import React from 'react'

import {encodeQuery, withRouterWithQuery} from "../routerUtils";

import todoLogic from '../logic/todoLogic'
import TodoList from './TodoList'
import GroupList from './GroupList'
import {BackAndTitle, MembaIconAndTitle, PageTopNavbar, ToolbarButton} from './PageTopNavbar'
import {BorderlessBottomNavbar} from "./PageBottomNavbar";
import PageBody from './PageBody'
import AddItemButton from './AddItemButton'

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
    };

    render() {
        return <div>
            <TodoListView
                groupId={this.getGroupId()}
                groups={todoLogic.listGroups({groupId: this.getGroupId()})}
                todos={todoLogic.listTodos({groupId: this.getGroupId(), showCompleted: this.state.showCompleted})}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
                onClickEditGroup={() => this.onEditGroup()}
            />
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

    onEditGroup() {
        this.hideModal();
        this.props.history.push(encodeQuery("/group/" + this.getGroupId(), {groupId: this.getGroupId()}))
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
            <AddItemButton groupId={groupId}/>
        </BorderlessBottomNavbar>
    </div>
};



