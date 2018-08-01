import React from 'react'
import {jsonGet} from '../apiHelper'
import TodoItem from './TodoItem'
import AddTodoButton from './AddTodoButton'

export default ({style, children}) =>
    <div style={{
        display: "flex",
        flexDirection: "column",
        ...style
    }}>
        {children}
    </div>;
        
