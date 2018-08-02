import React from 'react'

const CELL_STYLE = {paddingTop: 20, paddingBottom: 20};

export const TodoItem = ({todo}) => <tr>
    <td style={CELL_STYLE}>
        <h5>{todo.text}</h5>
    </td>
</tr>;


export default TodoItem