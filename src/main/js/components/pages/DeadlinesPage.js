import React from 'react'

import {BackAndTitle} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import ListIsEmpty from "../ListIsEmpty";
import todoLogic from "../../logic/todoLogic"
import {TodoListItemWithCheckbox} from './TodoListPage'

export default () => {
    const todos = todoLogic.listTodosWithDeadlines();

    return <div>
        <BackAndTitle title="Deadlines"/>

        <PageBody>
            {
                todos.length === 0 ? <ListIsEmpty text="No items with deadlines found"/> :
                    <div>
                        {todos.map(t => <TodoListItemWithCheckbox key={t.id} todo={t} backTo="/deadlines"/>)}
                    </div>
            }
        </PageBody>
    </div>
}

