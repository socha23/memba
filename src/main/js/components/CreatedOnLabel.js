import React from 'react'
import momentToString from '../momentToString'

const CreatedOnLabel = ({todo}) => <span style={{
    color: "#777",
    fontSize: 12,
}}>
    {momentToString(todo.createdOn)}
</span>

export default CreatedOnLabel