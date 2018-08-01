import React from 'react'

export const TodoItem = ({todo}) => <li className="list-group-item">
    {todo.text}
</li>;


export default TodoItem