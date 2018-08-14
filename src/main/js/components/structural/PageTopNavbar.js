import React from 'react'
import {LinkWithQuery, withRouterWithQuery, encodeQuery} from "../../routerUtils";

export const PageTopNavbar = ({children}) => <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary"
                                                  style={{
                                                      border: "none",
                                                      paddingTop: 1,
                                                      paddingRight: 2,
                                                      paddingBottom: 0,
                                                      paddingLeft: 2
                                                  }}>
    <div className="container">
        {children}
    </div>
</nav>;

export const PageTitle = ({children}) => <span
    className="navbar-brand"
    style={{
        paddingLeft: 8,
        borderRight: "none",
        textOverflow: "ellipsis",
        overflow: "hidden"
    }}>{children}</span>;

export const TitleWithBackNavbar = ({title = "Memba", to = "/", query = {}, children}) => <PageTopNavbar>
    <BackAndTitle title={title} to={to} query={query}/>
    {children}
</PageTopNavbar>;


export const ToolbarButton = ({className = "", onClick = () => {}, active = false, style={}}) =>
    <i className={className}
       onClick={() => onClick()}
       style={{
           fontSize: 20,
           padding: 10,
           paddingRight: 8,
           cursor: "pointer",
           color: active ? "#62c462" : "white",
           ...style
       }}
    />;

export const BackAndTitle = withRouterWithQuery(({title = "Memba", to = "/", query = {}, history}) => <div
        style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",

        }} onClick={() => {history.push(encodeQuery(to, query))}}
    >
        <ToolbarButton className={"fas fa-backward"}/>
        <PageTitle>{title}</PageTitle>
    </div>
    );

export const MembaIconAndTitle = ({title = "Memba"}) => <div>
    <img src="memba48x44.png" width={48} height={44}
         style={{marginTop: 3, marginRight: 1, marginBottom: 0, marginLeft: 1}}
         className="d-inline-block align-top"/>
    <PageTitle>{title}</PageTitle>
</div>;


export const BrandedNavbar = ({title = "Memba", children}) => <PageTopNavbar>
    <MembaIconAndTitle title={title}/>
    {children}
</PageTopNavbar>;

