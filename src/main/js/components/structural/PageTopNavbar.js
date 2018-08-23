import React from 'react'
import {encodeQuery, withRouterWithQuery} from "../../routerUtils";

export const PageTopNavbar = ({children, color="#3A3F44"}) => <div><nav className="navbar fixed-top navbar-expand-lg navbar-dark"
                                                  style={{
                                                      border: "none",
                                                      paddingTop: 1,
                                                      paddingRight: 2,
                                                      paddingBottom: 0,
                                                      paddingLeft: 2,
                                                      borderBottom: "1px solid black",
                                                      backgroundColor: color,
                                                  }}>
    <div className="container" style={{flexWrap: "nowrap"}}>
        {children}
    </div>
</nav>
    <div style={{height: 54}}/>
</div>;

export const PageTitle = ({children}) => <span
    className="navbar-brand"
    style={{
        color: "white",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 8,
        borderRight: "none",
        textOverflow: "ellipsis",
        overflow: "hidden"
    }}>{children}</span>;

export const TitleWithBackNavbar = ({title = "Memba", to = "/", query = {}, children, color="#3A3F44"}) => <PageTopNavbar color={color}>
    <BackAndTitle title={title} to={to} query={query}/>
    {children}
</PageTopNavbar>;


export const ToolbarButton = ({className = "", onClick = () => {}, active = false, style = {}}) =>
    <i className={className}
       onClick={() => onClick()}
       style={{
           fontSize: 20,
           padding: 10,
           paddingRight: 10,
           paddingLeft: 20,
           cursor: "pointer",
           color: active ? "#62c462" : "white",
           ...style
       }}
    />;

const LEFT_STYLE = {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",

};

export const BackAndTitle = withRouterWithQuery(({title = "Memba", to = "/", query = {}, history}) => <div
        style={LEFT_STYLE} onClick={() => {history.push(encodeQuery(to, query))}}
    >
        <ToolbarButton className={"fas fa-backward"}/>
        <PageTitle>{title}</PageTitle>
    </div>
);

export const MembaIconAndTitle = ({title = "Memba"}) => <div
    style={LEFT_STYLE}>
    <img src="memba48x44.png" width={48} height={44}
         style={{marginRight: 1, marginLeft: 1}}
         className="d-inline-block align-top"/>
    <PageTitle>{title}</PageTitle>
</div>;

export const IconAndTitle = ({title = "Memba", iconClass = "", onClick = () => {}}) => <div
    style={LEFT_STYLE}
    onClick={onClick}
>
    <ToolbarButton className={iconClass} style={{paddingRight: 5, paddingLeft: 10}}/>
    <PageTitle>{title}</PageTitle>
</div>;


export const BrandedNavbar = ({title = "Memba", children}) => <PageTopNavbar>
    <MembaIconAndTitle title={title}/>
    {children}
</PageTopNavbar>;

