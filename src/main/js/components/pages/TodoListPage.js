import React from 'react'

import {withRouterWithQuery} from '../../routerUtils'
import todoLogic from '../../logic/todoLogic'
import {BottomButtonBar} from "../structural/PageBottomBar";
import AddItemButton from '../AddItemButton'
import TodoListPageViewStandardMode from "./todoListComponents/TodoListPageViewStandardMode";
import GroupNavbar from "./todoListComponents/GroupNavbar";
import ListIsEmpty from "../ListIsEmpty";

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

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => <BottomButtonBar>
    <AddItemButton groupId={groupId}/>
</BottomButtonBar>;

