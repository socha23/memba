import React from 'react'
import {withRouterWithQuery} from '../../routerUtils'

import {currentUserId} from '../../currentUser'
import todoLogic from '../../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import TodoForm from '../TodoForm'

import {DEFAULT_COLOR} from "../ColorPicker";

const AddTodoPage = ({location}) =>
    <AbstractItemFormPage
        formComponent={TodoForm}
        item={{
            text: '',
            color: DEFAULT_COLOR,
            groupId: location.query.groupId || todoLogic.ROOT_GROUP_ID,
            ownerIds: [currentUserId()],
        }}
        onSave={(item) => {
            setTimeout(() => {
                todoLogic.addTodo(item);
            });
        }}
        title="New item"
        createMode={true}
    />;

export default withRouterWithQuery(AddTodoPage)