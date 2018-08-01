import React from 'react'
import {Switch, Route} from 'react-router-dom'

import TodoList from './TodoList'
import AddTodo from './AddTodo'
import SignInRequired from './SignInRequired'

export default () => <div style={{maxWidth: 700, margin: "auto"}}>
    <SignInRequired>
        <Switch>
            <Route exact path="/" component={TodoList}/>
            <Route path="/add" component={AddTodo}/>
        </Switch>
    </SignInRequired>

</div>