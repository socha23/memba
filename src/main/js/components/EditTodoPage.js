import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import TodoForm from './TodoForm'


const EditTodoPage = ({match}) =>
    <AbstractItemFormPage
        formComponent={TodoForm}
        item={todoLogic.findTodoById(match.params.todoId)}
        onSave={(i) => {todoLogic.updateTodo(i.id, i)}}
        title="Edit todo"
        createMode={false}
    />;

export default withRouterWithQuery(EditTodoPage)