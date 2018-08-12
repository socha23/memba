import React from 'react'

import {encodeQuery, withRouterWithQuery} from "../../../routerUtils";

import todoLogic from '../../../logic/todoLogic'
import {BackAndTitle, MembaIconAndTitle, PageTopNavbar, ToolbarButton} from '../../structural/PageTopNavbar'

function isRoot(groupId) {
    return groupId === todoLogic.ROOT_GROUP_ID;
}

const TodoListPageNavbar = withRouterWithQuery(({
                                                    groupId = todoLogic.ROOT_GROUP_ID,
                                                    showCompleted = false,
                                                    onToggleShowCompleted,
                                                    history
                                                }) => {

    let navbarFirstElem;
    if (isRoot(groupId)) {
        navbarFirstElem = <MembaIconAndTitle/>;
    } else {
        const group = todoLogic.findGroupById(groupId);
        navbarFirstElem = <BackAndTitle
            query={{groupId: group.groupId || todoLogic.ROOT_GROUP_ID}}
            title={group.text}
        />
    }

    const showCompletedButton = <ToolbarButton
        className="far fa-check-square"
        inactive={!showCompleted}
        onClick={() => onToggleShowCompleted()}
    />;

    const editGroupButton = isRoot(groupId) ? <span/> :
        <ToolbarButton
            className="fas fa-cog"
            onClick={() => {history.push(encodeQuery("/group/" + groupId, {groupId: groupId}))}}
        />;

    return <PageTopNavbar>
        {navbarFirstElem}
        <div className="btn-toolbar">
            {editGroupButton}
            {showCompletedButton}
        </div>
    </PageTopNavbar>
});

export default TodoListPageNavbar