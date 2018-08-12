import React from 'react'
import {DEFAULT_COLOR} from "./ColorPicker";

const TodoView = ({todo, onClick, children}) => {
    const opacity = todo.completed ? 0.3 : 1;

    return <div className="todoItem">
        <div style={{
            minHeight: 70,
            paddingLeft: 12,
            paddingRight: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <div style={{flexGrow: 1}} onClick={() => {onClick(todo)}}>
                <h5 style={{
                    opacity: opacity,
                    marginBottom: 7,
                    fontWeight: 300,
                    color: (todo.color == null ? DEFAULT_COLOR : todo.color)
                }}>{todo.text}</h5>
            </div>
            {children}
        </div>
    </div>
};


export default TodoView;