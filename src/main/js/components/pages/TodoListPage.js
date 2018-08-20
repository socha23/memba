import React from 'react'

import {withRouterWithQuery} from '../../routerUtils'
import todoLogic from '../../logic/todoLogic'
import {BottomButtonBar} from "../structural/PageBottomBar";
import AddItemButton from '../AddItemButton'
import TodoListPageViewStandardMode from "./todoListComponents/TodoListPageViewStandardMode";
import GroupNavbar from "./todoListComponents/GroupNavbar";

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
        reorderMode: false
    };

    render() {
        return <div>
            <GroupNavbar
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
        todoLogic.subscribe(this, () => {this.setState({generation: this.state.generation + 1})})
    }

    componentWillUnmount() {
        todoLogic.unsubscribe(this)
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
        return <NothingHere/>
    } else {
        return <TodoListPageViewStandardMode groups={groups} todos={todos}/>
    }

};

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => <BottomButtonBar>
    <AddItemButton groupId={groupId}/>
</BottomButtonBar>;

const NothingHere = () => <div style={{
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
    fontSize: 20
}}>
    List is empty
</div>;


