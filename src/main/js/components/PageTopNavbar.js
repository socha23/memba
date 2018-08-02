import React from 'react'

export default ({children}) => <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary"
                                    style={{padding: "0 5px 0 0"}}>
    <div className="container">
        {children}
    </div>
</nav>;

