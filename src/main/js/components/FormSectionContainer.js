import React from 'react'

export default ({children}) => <div style={{
    borderTop: "1px solid #888",
    padding: 6,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-between"
}}>
    {children}
</div>;
