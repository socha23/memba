import React from 'react'

import {withRouterWithQuery} from '../../routerUtils'
import todoLogic from '../../logic/todoLogic'
import {ROOT_GROUP_ID} from "../../logic/constants";
import {BottomButtonBar} from "../structural/PageBottomBar";
import AddItemButton from '../AddItemButton'
import TodoListPageViewStandardMode from "./todoListComponents/TodoListPageViewStandardMode";
import TodoListPageNavbar from './todoListComponents/TodoListPageNavbar'
import TodoListPageViewReorderMode from "./todoListComponents/TodoListPageViewReorderMode";
import GroupNavbar from "./todoListComponents/GroupNavbar";

class TodoListPage extends React.Component {
    state = {
        generation: 0,
        showCompleted: false,
        reorderMode: false
    };

    renderNavbar() {
        if (this.getGroupId() === ROOT_GROUP_ID) {
            return <TodoListPageNavbar
                groupId={this.getGroupId()}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
                reorderMode={this.state.reorderMode}
                onToggleReorderMode={() => this.onToggleReorderMode()}
            />
        } else {
            return <GroupNavbar
                groupId={this.getGroupId()}
                showCompleted={this.state.showCompleted}
                onToggleShowCompleted={() => this.onToggleShowCompleted()}
            />
        }
    }

    render() {
        return <div>
            {
                this.renderNavbar()
            }
            <TodoListView
                reorderMode={this.state.reorderMode}
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
                          reorderMode = false,
                          showCompleted = false,
                      }) => {
    const groups = todoLogic.listGroups({groupId: groupId});
    const todos = todoLogic.listTodos({groupId: groupId, showCompleted: showCompleted});

    if (groups.length === 0 && todos.length === 0) {
        return <NothingHere/>
    } else if (reorderMode) {
        return <TodoListPageViewReorderMode groups={groups} todos={todos}/>
    }
    return <TodoListPageViewStandardMode groups={groups} todos={todos}/>
};

const TodoListPageBottomToolbar = ({addEnabled, groupId}) => addEnabled ? <BottomButtonBar>
    <AddItemButton groupId={groupId}/>
</BottomButtonBar> : <span/>;

const NothingHere = () => <div style={{
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
    fontSize: 20
}}>
    List is empty
</div>;


