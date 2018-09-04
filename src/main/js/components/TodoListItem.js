import React from 'react'
import {DEFAULT_COLOR} from "./ColorPicker"
import WhenLabel from './WhenLabel'

const TodoView = ({todo, onClick = () => {}, children}) => {
    const opacity = todo.completed ? 0.3 : 1;

    return <div className="todoItem">
        <div style={{
            minHeight: 70,
            paddingLeft: 12,
            paddingRight: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
        }}>
            <div style={{flexGrow: 1}} onClick={() => {onClick(todo)}}>
                <h5 style={{
                    opacity: opacity,
                    marginTop: 5,
                    marginBottom: 3,
                    fontWeight: 300,
                    color: (todo.color == null ? DEFAULT_COLOR : todo.color)
                }}>{todo.text}</h5>
                <div>
                    <WhenLabel when={todo.when}/>
                </div>
            </div>
            {children}
        </div>
    </div>
};


export default TodoView;