import React from 'react'

import {withRouterWithQuery} from '../../routerUtils'
import todoLogic from '../../logic/todoLogic'
import {BorderlessBottomNavbar} from "../structural/PageBottomNavbar";
import AddItemButton from '../AddItemButton'
import TodoListPageViewStandardMode from "./todoListComponents/TodoListPageViewStandardMode";
import TodoListPageNavbar from './todoListComponents/TodoListPageNavbar'

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
        reorderMode: false
    };

    render() {
        return <div>
            <TodoListPageNavbar
                groupId={this.getGroupId()}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
                reorderMode={this.state.reorderMode}
                onToggleReorderMode={() => this.onToggleReorderMode()}
            />
            <TodoListView
                showCompleted={this.state.showCompleted}
                groupId={this.getGroupId()}
            />
            <TodoListPageBottomToolbar
                groupId={this.getGroupId()}
                addEnabled={true}
            />
        </div>
    }

    getGroupId() {
        return this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID
    }

    onToggleShowCompleted() {
        this.setState({showCompleted: !this.state.showCompleted})
    }

    onToggleReorderMode() {
        this.setState({reorderMode: !this.state.reorderMode})
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

    return <TodoListPageViewStandardMode
        groups={groups}
        todos={todos}
    />
};

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => addEnabled ? <BorderlessBottomNavbar>
    <AddItemButton groupId={groupId}/>
</BorderlessBottomNavbar> : <span/>;


