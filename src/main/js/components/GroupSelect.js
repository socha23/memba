import React from 'react'
import todoLogic from '../logic/todoLogic'
import {groupTreeAsListWithIdent} from "../logic/groupTree";

export default ({value, disabledId = 0, onChangeValue}) => {

    const rootGroup = {id: "root", text: "(none)", ident: 0};

    const currentGroup = value === todoLogic.ROOT_GROUP_ID ? rootGroup : todoLogic.findGroupById(value);

    const rows = groupTreeAsListWithIdent(todoLogic.listGroups({groupId: ""}));
    return <div className="form-group">
        <label htmlFor="groupSelect">Parent group:</label>
        <select id="groupSelect" className="form-control"
                value={value}
                style={{padding: 4, height: 35}}
                onChange={e => {
                    let val = e.target.value;
                    if (val.startsWith("_")) {
                        val = val.substring(1);
                    }
                    onChangeValue(val);
                }}
        >
            <option value={value} key={"current"}>{currentGroup.text}</option>
            <option disabled={true}></option>
            <option value="_root" key={"root"}>{rootGroup.text}</option>
            {

                rows.map(r => <option key={r.id}
                                      value={"_" + r.id}
                                      disabled={r.id === value || r.id === disabledId}
                >
                    {"\u00A0".repeat(r.ident * 5) + r.text}
                </option>)
            }

        </select>
    </div>
};

