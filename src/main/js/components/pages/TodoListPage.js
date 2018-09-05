import React from 'react'

import {encodeQuery, withRouterWithQuery} from '../../routerUtils'
import todoLogic from '../../logic/todoLogic'

import {ToolbarButton} from "../structural/PageTopNavbar";
import {SizeChangingNavbar, RootNavbar} from "../structural/GroupNavbar";
import {BottomButtonBar} from "../structural/PageBottomBar";
import PageBody from '../structural/PageBody'

import AddItemButton from '../AddItemButton'
import ListIsEmpty from "../ListIsEmpty";
import AnimatedList from '../AnimatedList'
import TodoListItem from '../TodoListItem'
import GroupListItem from '../GroupListItem'

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
        reorderMode: false
    };

    render() {
        return <div>
            <ListModeNavbar
                            groupId={this.getGroupId()}
                            showCompleted={this.state.showCompleted}
                            onToggleShowCompleted={() => this.onToggleShowCompleted()}
            />
            <TodoListView
                showCompleted={this.state.showCompleted}
                groupId={this.getGroupId()}
            />
            <TodoListPageBottomToolbar
                groupId={this.getGroupId()}
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
        todoLogic.subscribe(this, () => {this.setState({generation: this.state.generation + 1})});
        $(window).scrollTop(0);
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.query.groupId !== prevProps.location.query.groupId) {
            $(window).scrollTop(0);
        }
    }
}

export default withRouterWithQuery(TodoListPage);


const TodoListView = ({
                          groupId = todoLogic.ROOT_GROUP_ID,
                          showCompleted = false,
                      }) => {
    const groups = todoLogic.listGroups({groupId: groupId});
    const todos = todoLogic.listTodos({groupId: groupId, showCompleted: showCompleted});

    if (groups.length === 0 && todos.length === 0) {
        return <ListIsEmpty/>
    } else {
        return <TodoListPageViewStandardMode groups={groups} todos={todos}/>
    }

};

const TodoListPageViewStandardMode = withRouterWithQuery(({
                                          history,
                                          groups = [],
                                          todos = [],
                                      }) => {

    return <PageBody>
        <AnimatedList>
            {groups.map(g => <GroupListItem
                    key={g.id}
                    group={g}
                    onClick={() => { history.push(encodeQuery("/", {groupId: g.id}))}}>

                {todoLogic.countNotCompletedInGroup(g.id) === 0 ? <span/> : <span
                    style={{
                        fontSize: 34,
                        fontWeight: 600,
                        marginRight: 6,
                        marginLeft: 6,
                    }}
                >{todoLogic.countNotCompletedInGroup(g.id)}</span>}
                </GroupListItem>
            )}
        </AnimatedList>
        <AnimatedList>
            {todos.map(t => <TodoListItemWithCheckbox
                key={t.id}
                todo={t}
            />)}
        </AnimatedList>
        <div style={{height: 100}}/>
    </PageBody>
});

export const TodoListItemWithCheckbox = withRouterWithQuery(({history, todo, backTo="/"}) => <TodoListItem
                todo={todo}
                onClick={() => { history.push(encodeQuery("/todo/" + todo.id, {backTo: backTo, groupId: todo.id})) }}
            >
                <div style={{cursor: "pointer"}} onClick={() => todoLogic.setCompleted(todo.id, !todo.completed)}>
                    <i style={{fontSize: 40}} className={"far " + (todo.completed ? "fa-check-square" : "fa-square")}/>
                </div>
            </TodoListItem>);

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => <BottomButtonBar>
    <AddItemButton groupId={groupId}/>
</BottomButtonBar>;


export const ListModeNavbar = withRouterWithQuery(({history, groupId, showCompleted, onToggleShowCompleted}) => {
    if (todoLogic.isRootId(groupId)) {
        return <RootNavbar>
            <RootRightButtons showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
        </RootNavbar>
    }
    const group = todoLogic.findGroupById(groupId);
    if (group == null) {
        history.push("/");
    } else {
        return <SizeChangingNavbar group={group}>
                <GroupRightButtons groupId={group.id} showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
        </SizeChangingNavbar>
    }
});



const RootRightButtons = ({showCompleted, onToggleShowCompleted}) => {
    return <div id="smallToolbar" className="btn-toolbar" style={{display: "flex", flexWrap: "nowrap"}}>
        <DeadlinesButton/>
        <ReorderGroupButton groupId={"root"}/>
        <ShowCompletedButton showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
    </div>
};

const GroupRightButtons = ({groupId, showCompleted, onToggleShowCompleted}) => {
    return <div id="smallToolbar" className="btn-toolbar" style={{display: "flex", flexWrap: "nowrap"}}>
        <EditGroupButton groupId={groupId}/>
        <ReorderGroupButton groupId={groupId}/>
        <ShowCompletedButton showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
    </div>
};

const ShowCompletedButton = ({showCompleted, onToggleShowCompleted}) => <ToolbarButton
    className="far fa-check-square"
    active={showCompleted}
    onClick={() => onToggleShowCompleted()}
/>;

const DeadlinesButton = withRouterWithQuery(({history}) => <ToolbarButton
    className="far fa-calendar-alt"
    onClick={() => {history.push(encodeQuery("/deadlines"))}}
/>);

const EditGroupButton = withRouterWithQuery(({history, groupId}) => <ToolbarButton
    className="fas fa-cog"
    onClick={() => {history.push(encodeQuery("/group/" + groupId, {groupId: groupId}))}}
/>);

const ReorderGroupButton = withRouterWithQuery(({history, groupId}) => <ToolbarButton
    className="fas fa-sort"
    onClick={() => {history.push(encodeQuery("/reorder/" + groupId))}}
/>);


