import React from 'react'

export default ({todo}) =>
    <div className="todoItem"
         style={{
             paddingTop: 20,
             paddingBottom: 20,
             paddingLeft: 12,
             paddingRight: 12
         }}>
        <h5>{todo.text}</h5>
    </div>;
