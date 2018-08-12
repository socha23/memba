import React from 'react'
import {Switch, Route} from 'react-router-dom'

import SignInRequired from './components/structural/SignInRequired'
import WaitForTodosToLoad from './components/structural/WaitForTodosToLoad'

import TodoListPage from './components/pages/TodoListPage'
import AddTodoPage from './components/pages/AddTodoPage'
import EditTodoPage from './components/pages/EditTodoPage'
import AddGroupPage from './components/pages/AddGroupPage'
import EditGroupPage from './components/pages/EditGroupPage'

export default () => <div className="container" style={{padding: 0}}>
    <SignInRequired>
        <WaitForTodosToLoad>
            <Switch>
                <Route exact path="/" component={TodoListPage}/>
                <Route path="/addTodo" component={AddTodoPage}/>
                <Route path="/todo/:todoId" component={EditTodoPage}/>
                <Route path="/addGroup" component={AddGroupPage}/>
                <Route path="/group/:groupId" component={EditGroupPage}/>
            </Switch>
        </WaitForTodosToLoad>
    </SignInRequired>


</div>