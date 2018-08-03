import React from 'react'

const PADDING = {paddingTop: 0, paddingRight: 2, paddingBottom: 2, paddingLeft: 2};

export const PageBottomNavbar =  ({children}) => <nav className="navbar fixed-bottom navbar-expand-lg"
                                    style={PADDING}>
    <div className="container">
        {children}
    </div>
</nav>;


export const StatusBottomNavbar = PageBottomNavbar;

export const BorderlessBottomNavbar =  ({children}) => <nav className="navbar fixed-bottom navbar-expand-lg"
                                    style={{...PADDING, border: "none"}}>
    <div className="container">
        {children}
    </div>
</nav>;