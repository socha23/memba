import React from 'react'
import {encodeQuery, withRouterWithQuery} from '../routerUtils'
import {DEFAULT_COLOR} from "./ColorPicker";

const GroupView = ({group, history}) => {
    return <div className="todoItem" >
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
        }}
             onClick={() => { history.push(encodeQuery("/", {groupId: group.id})) }}
        >
            <span/>
            <span style={{
                fontSize: 26,
                fontWeight: 500,
                paddingBottom: 6
            }}>{group.text}</span>
            <i style={{fontSize: 40}} className={"fas fa-chevron-right"}/>

        </div>
    </div>
};


export default withRouterWithQuery(GroupView);