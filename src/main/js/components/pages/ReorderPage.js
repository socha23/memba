import React from 'react'

import todoLogic from '../../logic/todoLogic'
import {BottomButtonBar} from "../structural/PageBottomBar";
import ButtonIcon from '../ButtonIcon'
import {IconAndTitle, PageTopNavbar, TitleWithBackNavbar} from "../structural/PageTopNavbar";
import ListIsEmpty from "../ListIsEmpty";
import TodoListPageViewReorderMode from "./todoListComponents/TodoListPageViewReorderMode";
import {encodeQuery, withRouterWithQuery} from "../../routerUtils";
import {message} from "../../toast"

class ReorderPage extends React.Component {
    state = {
        generation: 0,
        groups: [],
        todos: [],
    };

    render() {
        const group = todoLogic.findGroupById(this.getGroupId());

        return <div>
            <PageTopNavbar color={group.color}>
                <IconAndTitle title={"Reorder"} onClick={() => {this.onSave()}} iconClass={"fas fa-backward"}/>
            </PageTopNavbar>


            {(this.state.groups.length === 0 && this.state.todos.length === 0) ? <ListIsEmpty/> :
                <TodoListPageViewReorderMode
                    todos={this.state.todos}
                    groups={this.state.groups}
                    onSwapGroups={(a, b) => {this.onSwapGroups(a, b)}}
                    onSwapTodos={(a, b) => {this.onSwapTodos(a, b)}}

                />
            }
            <BottomButtonBar>
                <button className={"btn btn-lg btn-block btn-success"} onClick={() => this.onSave()}>
                    <ButtonIcon className={"fas fa-check"}/>
                    Save changes
                </button>
            </BottomButtonBar>
        </div>
    }

    onSwapGroups(a, b) {
        const newGroups = [...this.state.groups];
        newGroups[a] = this.state.groups[b];
        newGroups[b] = this.state.groups[a];
        this.setState({groups: newGroups});
    }

    onSwapTodos(a, b) {
        const newTodos = [...this.state.todos];
        newTodos[a] = this.state.todos[b];
        newTodos[b] = this.state.todos[a];
        this.setState({todos: newTodos});
    }

    onSave() {
        const group = todoLogic.findGroupById(this.getGroupId());
        group.groupOrder = this.state.groups.map(g => g.id);
        group.todoOrder = this.state.todos.map(t => t.id);
        todoLogic.updateGroup(group.id, group)
            .then(() => {
                message("Changes saved");
                this.props.history.push(encodeQuery("/", {groupId: this.getGroupId()}));
            });
    }

    getGroupId() {
        return this.props.match.params.groupId || todoLogic.ROOT_GROUP_ID
    }

    componentDidMount() {
        this.setState({
            groups: todoLogic.listGroups({groupId: this.getGroupId()}),
            todos: todoLogic.listTodos({groupId: this.getGroupId()}),
        });
    }
}

export default withRouterWithQuery(ReorderPage);

