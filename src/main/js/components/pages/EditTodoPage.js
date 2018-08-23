import React from 'react'
import {encodeQuery, withRouterWithQuery} from '../../routerUtils'

import {message} from '../../toast'

import todoLogic from '../../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import TodoForm from '../TodoForm'
import DeleteToolbarButton from "../DeleteToolbarButton";

const EditTodoPage = ({history, match}) => {
    const item = todoLogic.findTodoById(match.params.todoId);
    if (item == null) {
        history.push("/");
        return <span/>;
    }
    const deleteButton = <DeleteToolbarButton
        item={item}
        onDelete={() => todoLogic.deleteTodo(item.id).then(() => message("Item deleted"))}/>;
    return <AbstractItemFormPage
        formComponent={TodoForm}
        item={item}
        onSave={(i) => {
            todoLogic.updateTodo(i.id, i).then(() => {
                history.push(encodeQuery("/", {groupId: item.groupId}));
                message("Changes saved");
            });
        }}
        onBack={() => {
            history.push(encodeQuery("/", {groupId: item.groupId}));
        }}
        title="Edit item"
        createMode={false}
        toolbarButtons={deleteButton}
    />
};

export default withRouterWithQuery(EditTodoPage)