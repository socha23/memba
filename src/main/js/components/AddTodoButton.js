import React from 'react'
import {Link} from 'react-router-dom'

import BigButton from './BigButton'

export const AddTodoButton = () =>
    <Link to="/add">
        <BigButton>
            Add item
        </BigButton>
    </Link>;

    
export default AddTodoButton