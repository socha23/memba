import React from 'react'

export default ({children, style, onClick=()=>{}}) => <div onClick={onClick} style={{
    borderTop: "1px solid #888",
    padding: 6,
    fontSize: 16,
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    ...style
}}>
    {children}
</div>;
