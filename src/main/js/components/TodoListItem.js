import React from 'react'
import {DEFAULT_COLOR} from "./ColorPicker"
import WhenLabel from './WhenLabel'
import GroupPathLabel from "./GroupPathLabel";

const TodoView = ({todo, renderPath = false, onClick = () => {}, children}) => {
    const opacity = todo.completed ? 0.3 : 1;

    return <div className="todoItem">
        <div style={{
            minHeight: 70,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
        }}>
            <div style={{flexGrow: 1}} onClick={() => {onClick(todo)}}>
                <div style={{
                    opacity: opacity,
                    color: (todo.color == null ? DEFAULT_COLOR : todo.color),

                }}>
                    {renderPath ? <div><GroupPathLabel style={{color: "#aaa", fontSize: 14}} groupId={todo.groupId}/></div> : <span/>}
                <div style={{
                    fontSize: 16,
                    lineHeight: 1.2,
                }}>{todo.text}</div>
                </div>
                <div>
                    <WhenLabel when={todo.when}/>
                </div>
            </div>
            {children}
        </div>
    </div>
};


export default TodoView;