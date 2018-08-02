import React from 'react'
import {Switch, Route} from 'react-router-dom'

import TodoListPage from './TodoListPage'
import AddTodoPage from './AddTodoPage'
import SignInRequired from './SignInRequired'

export default () => <div className="container" style={{padding: 0}}>
    <SignInRequired>
        <Switch>
            <Route exact path="/" component={TodoListPage}/>
            <Route path="/add" component={AddTodoPage}/>
        </Switch>
    </SignInRequired>

</div>