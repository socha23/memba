import React from 'react'
import {Link} from 'react-router-dom'
import todoLogic from '../logic/todoLogic'
import {DEFAULT_COLOR} from "./ColorPicker";

const TodoView = ({todo}) => {
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
            <Link to={"/todo/" + todo.id} style={{flexGrow: 1}}>
                <h5 style={{
                    opacity: opacity,
                    marginBottom: 7,
                    fontWeight: 300,
                    color: (todo.color == null ? DEFAULT_COLOR : todo.color)
                }}>{todo.text}</h5>
            </Link>
            <div style={{cursor: "pointer"}} onClick={() => todoLogic.setCompleted(todo.id, !todo.completed)}>
                <i style={{fontSize: 40}} className={"far " + (todo.completed ? "fa-check-square" : "fa-square")}/>

            </div>


        </div>
    </div>
};


export default TodoView;