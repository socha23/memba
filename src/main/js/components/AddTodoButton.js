import React from 'react'

export const AddTodoButton = ({todo}) =>
    <div style={{
        display: "flex",
        alignItems: "center",
        height: 150,
        backgroundColor: "red",
        color: "white",
        cursor: "pointer"}}
    >

        <div style={{flexGrow: 1, textAlign: "center"}}>
            <h1>+ Add item</h1>
        </div>

    </div>;


export default AddTodoButton