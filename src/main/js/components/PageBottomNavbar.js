import React from 'react'

export default ({children}) => <nav className="navbar fixed-bottom navbar-expand-lg"
                                    style={{paddingTop: 0, paddingRight: 2, paddingBottom: 2, paddingLeft: 2}}>
    <div className="container">
        {children}
    </div>
</nav>;

