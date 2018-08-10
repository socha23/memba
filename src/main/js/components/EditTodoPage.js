import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractTodoFormPage from './AbstractItemFormPage'

const EditTodoPage = ({match}) =>
    <AbstractTodoFormPage
        item={todoLogic.findTodoById(match.params.todoId)}
        onSave={(i) => {todoLogic.update(i.id, i)}}
        title="Edit todo"
        createMode={false}
    />

export default withRouterWithQuery(EditTodoPage)