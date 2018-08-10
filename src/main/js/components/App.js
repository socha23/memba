import React from 'react'
import {Switch, Route} from 'react-router-dom'

import SignInRequired from './SignInRequired'
import WaitForTodosToLoad from './WaitForTodosToLoad'

import TodoListPage from './TodoListPage'
import AddTodoPage from './AddTodoPage'
import EditTodoPage from './EditTodoPage'

export default () => <div className="container" style={{padding: 0}}>
    <SignInRequired>
        <WaitForTodosToLoad>
            <Switch>
                <Route exact path="/" component={TodoListPage}/>
                <Route path="/addTodo" component={AddTodoPage}/>
                <Route path="/todo/:todoId" component={EditTodoPage}/>
            </Switch>
        </WaitForTodosToLoad>
    </SignInRequired>


</div>