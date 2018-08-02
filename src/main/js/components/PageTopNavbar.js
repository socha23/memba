import React from 'react'

export const PageTopNavbar = ({children}) => <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary"
                                                  style={{paddingTop: 2, paddingRight: 0, paddingBottom: 0, paddingLeft: 2}}>
    <div className="container">
        {children}
    </div>
</nav>;
    
export const BrandedNavbar = ({title = "Memba", children}) => <PageTopNavbar>
    <div>
        <img src="memba48x44.png" width={48} height={44} style={{marginTop: 3, marginRight: 2, marginBottom: 0, marginLeft: 0}} className="d-inline-block align-top"/>
        <span className="navbar-brand" style={{paddingLeft: 3}}>{title}</span>
    </div>
    {children}
</PageTopNavbar>;

