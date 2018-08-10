import React from 'react'
import {LinkWithQuery} from "../routerUtils";
import ButtonIcon from "./ButtonIcon";

export const PageTopNavbar = ({children}) => <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary"
                                                  style={{
                                                      paddingTop: 0,
                                                      paddingRight: 2,
                                                      paddingBottom: 0,
                                                      paddingLeft: 2
                                                  }}>
    <div className="container">
        {children}
    </div>
</nav>;

export const PageTitle = ({children}) => <span className="navbar-brand"
                                               style={{paddingLeft: 8, borderRight: "none"}}>{children}</span>

export const TitleWithBackNavbar = ({title = "Memba", to = "/", query = {}, children}) => <PageTopNavbar>
    <BackAndTitle title={title} to={to} query={query}/>
    {children}
</PageTopNavbar>;

export const BackAndTitle = ({title = "Memba", to = "/", query = {}}) => <div style={{display: "flex", alignItems: "center"}}>
        <LinkWithQuery to={to} query={query} className="btn btn-primary" style={{paddingRight: 10}}>
            <ButtonIcon className={"fas fa-backward"}/></LinkWithQuery>
        <PageTitle>{title}</PageTitle>
    </div>
;

export const MembaIconAndTitle = ({title = "Memba"}) => <div>
    <img src="memba48x44.png" width={48} height={44}
         style={{marginTop: 3, marginRight: 2, marginBottom: 0, marginLeft: 0}}
         className="d-inline-block align-top"/>
    <PageTitle>{title}</PageTitle>
</div>;


export const BrandedNavbar = ({title = "Memba", children}) => <PageTopNavbar>
    <MembaIconAndTitle title={title}/>
    {children}
</PageTopNavbar>;

