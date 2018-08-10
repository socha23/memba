import React from 'react'
import {Switch, Route} from 'react-router-dom'

import SignInRequired from './SignInRequired'
import WaitForTodosToLoad from './WaitForTodosToLoad'

import TodoListPage from './TodoListPage'
import AddItemPage from './AddItemPage'
import EditItemPage from './EditItemPage'

export default () => <div className="container" style={{padding: 0}}>
    <SignInRequired>
        <WaitForTodosToLoad>
            <Switch>
                <Route exact path="/" component={TodoListPage}/>
                <Route path="/add" component={AddItemPage}/>
                <Route path="/todo/:itemId" component={EditItemPage}/>
            </Switch>
        </WaitForTodosToLoad>
    </SignInRequired>


</div>