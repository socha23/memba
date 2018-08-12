import React from 'react'
import {DEFAULT_COLOR} from "./ColorPicker";

const GroupView = ({group, onClick, children}) => {
    return <div className="todoItem">
        <div style={{
            minHeight: 70,
            paddingLeft: 12,
            paddingRight: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            backgroundColor: (group.color == null ? DEFAULT_COLOR : group.color),
            cursor: "pointer",
        }}>
            <span/>
            <div
                style={{flexGrow: 1, textAlign: "center"}}
                onClick={() => {onClick(group)}}>
                <span style={{
                    fontSize: 26,
                    fontWeight: 500,
                    paddingBottom: 6
                }}>{group.text}</span>
            </div>
            {children}
        </div>
    </div>
};


export default GroupView;