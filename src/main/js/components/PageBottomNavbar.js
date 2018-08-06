import React from 'react'

export const PageBottomNavbar =  ({children}) => <nav className="navbar fixed-bottom navbar-expand-lg"
                                    style={{padding: 2}}>
    <div className="container">
        {children}
    </div>
</nav>;


export const StatusBottomNavbar = PageBottomNavbar;

export const BorderlessBottomNavbar =  ({children}) => <nav className="navbar fixed-bottom navbar-expand-lg"
                                    style={{padding: 2, border: "none", backgroundColor: "#272B30"}}>
    <div className="container">
        {children}
    </div>
</nav>;