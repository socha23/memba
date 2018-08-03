import React from 'react'

export default ({todo}) => <div className="todoItem">
    <div style={{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 12,
        paddingRight: 12,
        display: "flex"
    }}>
        <h5>{todo.text}</h5>
        <i className="far fa-square"/>
    </div>
</div>;
