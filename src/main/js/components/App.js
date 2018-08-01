import React from 'react'
import TodoList from './TodoList'
import SignInRequired from './SignInRequired'


export default () => <div style={{maxWidth: 700, margin: "auto"}}>
    <SignInRequired>
        <TodoList/>
    </SignInRequired>
</div>