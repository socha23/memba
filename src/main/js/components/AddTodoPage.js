import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import TodoForm from './TodoForm'

import {DEFAULT_COLOR} from "./ColorPicker";

const AddTodoPage = ({location}) =>
    <AbstractItemFormPage
        formComponent={TodoForm}
        item={{
            text: '',
            color: DEFAULT_COLOR,
            groupId: location.query.groupId || todoLogic.ROOT_GROUP_ID,
        }}
        onSave={(item) => {
            setTimeout(() => {
                todoLogic.addTodo(item);
            });
        }}
        title="New todo"
        createMode={true}
    />;

export default withRouterWithQuery(AddTodoPage)