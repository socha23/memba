import React from 'react'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'

export const TitleWithBack = ({style, children, to}) =>
    <Link to={to}>
        <div style={{
            display: "flex",
            alignItems: "center",
            height: 50,
            backgroundColor: "black",
            color: "white",
            cursor: "pointer",
            ...style,
        }}
        >
            <div style={{flexGrow: 1, textAlign: "center"}}>
                <h1>{children}</h1>
            </div>

        </div>
    </Link>;

export default TitleWithBack