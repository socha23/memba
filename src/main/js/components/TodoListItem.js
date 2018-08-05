import React from 'react'
import todoLogic from '../todoLogic'

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
            color: "white"
        }}>
            <h5 style={{opacity: opacity, marginBottom: 7}}>{todo.text}</h5>
            <div style={{cursor: "pointer"}} onClick={() => todoLogic.setCompleted(todo.id, !todo.completed)}>
                <i style={{fontSize: 40}} className={"far " + (todo.completed ? "fa-check-square" : "fa-square")}/>

            </div>


        </div>
    </div>
};


export default TodoView;