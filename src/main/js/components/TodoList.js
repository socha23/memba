import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TodoItem from './TodoListItem'

export default ({todos}) => <ReactCSSTransitionGroup
        transitionName="todoItem"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
    >
        {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
    </ReactCSSTransitionGroup>
