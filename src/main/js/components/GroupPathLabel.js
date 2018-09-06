import React from 'react'

import todoLogic from '../logic/todoLogic'

const GroupPathLabel = ({groupId, style={}}) => {

    const elements = [];
    while (!todoLogic.isRootId(groupId)) {
        const group = todoLogic.findGroupById(groupId);
        if (group == null) {
            break;
        }
        elements.push(renderLabel(group));
        if (!todoLogic.isRootId(group.groupId)) {
            elements.push(renderCaret(group));
        }
        groupId = group.groupId
    }

    return <span style={style}>
        {elements}
    </span>;
};

function renderLabel(group) {
    return <span key={group.id}>
        {group.text}
    </span>
}

function renderCaret(group) {
    return <i
        key={group.id + ">"}
        className="fas fa-caret-right"
        style={{paddingLeft: 6, paddingRight: 6}}
    />
}

export default GroupPathLabel;
