import React from 'react'

import {encodeQuery, withRouterWithQuery} from "../../routerUtils";

import todoLogic from '../../logic/todoLogic'
import {BackAndTitle, MembaIconAndTitle, PageTopNavbar, ToolbarButton} from '../structural/PageTopNavbar'
import {BorderlessBottomNavbar} from "../structural/PageBottomNavbar";
import PageBody from '../structural/PageBody'
import AddItemButton from '../AddItemButton'
import AnimatedList from '../AnimatedList'
import TodoListItem from '../TodoListItem'
import GroupListItem from '../GroupListItem'

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
    };

    render() {
        return <div>
            <TodoListPageNavbar
                groupId={this.getGroupId()}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
            />
            <TodoListView showCompleted={this.state.showCompleted} groupId={this.getGroupId()}/>
            <TodoListPageBottomToolbar groupId={this.getGroupId()} addEnabled={true}/>
        </div>
    }

    getGroupId() {
        return this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID
    }

    onToggleShowCompleted() {
        this.setState({showCompleted: !this.state.showCompleted})
    }

    componentDidMount() {
        todoLogic.subscribe(this, () => {this.setState({generation: this.state.generation + 1})})
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
    }
}

export default withRouterWithQuery(TodoListPage);

function isRoot(groupId) {
    return groupId === todoLogic.ROOT_GROUP_ID;
}

const TodoListView = ({
                          groupId = todoLogic.ROOT_GROUP_ID,
                          showCompleted = false,
                      }) => {

    const groups = todoLogic.listGroups({groupId: groupId});
    const todos = todoLogic.listTodos({groupId: groupId, showCompleted: showCompleted});

    return <PageBody>
        <AnimatedList>
            {groups.map(g => <GroupListItem group={g}/>)}
        </AnimatedList>
        <AnimatedList>
            {todos.map(t => <TodoListItem todo={t}/>)}
        </AnimatedList>
    </PageBody>
};

const TodoListPageNavbar = withRouterWithQuery(({
                                                    groupId = todoLogic.ROOT_GROUP_ID,
                                                    showCompleted = false,
                                                    onToggleShowCompleted,
                                                    history
                                                }) => {

    let navbarFirstElem;
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

    const editGroupButton = isRoot(groupId) ? <span/> :
        <ToolbarButton
            className="fas fa-cog"
            onClick={() => {history.push(encodeQuery("/group/" + groupId, {groupId: groupId}))}}
        />;

    return <PageTopNavbar>
        {navbarFirstElem}
        <div className="btn-toolbar">
            {editGroupButton}
            {showCompletedButton}
        </div>
    </PageTopNavbar>
});

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => addEnabled ? <BorderlessBottomNavbar>
    <AddItemButton groupId={groupId}/>
</BorderlessBottomNavbar> : <span/>;


