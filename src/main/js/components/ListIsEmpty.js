import React from 'react'

const ListIsEmpty = ({text = "List is empty"}) => <div style={{
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
    fontSize: 20
}}>
    {text}
</div>;

export default ListIsEmpty

