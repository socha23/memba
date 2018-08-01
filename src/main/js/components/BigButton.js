import React from 'react'
import {NavLink} from 'react-router-dom'

export const BigButton = ({style, children}) =>
        <div style={{
            display: "flex",
            alignItems: "center",
            height: 150,
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
            ...style,
        }}
        >
            <div style={{flexGrow: 1, textAlign: "center"}}>
                <h1>{children}</h1>
            </div>

        </div>;

export default BigButton