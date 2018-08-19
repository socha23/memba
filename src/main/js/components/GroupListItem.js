import React from 'react'
import {DEFAULT_COLOR} from "./ColorPicker";

import sharingLogic from '../logic/sharingLogic'
import todoLogic from '../logic/todoLogic'

const GroupView = ({group, onClick = () => {}, children}) => {
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
            {todoLogic.isTopLevel(group) ? <SharedWith group={group}/> : <span/>}

            <div
                style={{flexGrow: 1, textAlign: "center"}}
                onClick={() => {onClick(group)}}>
                <span style={{
                    fontSize: 26,
                    fontWeight: 500,
                }}>{group.text}</span>
            </div>
            {children}
        </div>
    </div>
};


const SharedWith = ({group}) => <div>
    {
        sharingLogic.getUsersItemIsSharedWith(group).map(u =>
            <img src={u.pictureUrl}
                 key={u.id}
                 style={{
                     border: "1px solid #555",
                     marginRight: 5,
                     width: 40,
                     height: 40,
                     borderRadius: 20,
                 }}/>
        )
    }
</div>;


export default GroupView;