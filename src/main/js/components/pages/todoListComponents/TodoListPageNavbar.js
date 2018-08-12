import React from 'react'

import {encodeQuery, withRouterWithQuery} from "../../../routerUtils";

import todoLogic from '../../../logic/todoLogic'
import {BackAndTitle, MembaIconAndTitle, PageTopNavbar, ToolbarButton} from '../../structural/PageTopNavbar'

function isRoot(groupId) {
    return groupId === todoLogic.ROOT_GROUP_ID;
}

const TodoListPageNavbar = withRouterWithQuery(({
                                                    groupId = todoLogic.ROOT_GROUP_ID,
                                                    showCompleted, onToggleShowCompleted,
                                                    reorderMode, onToggleReorderMode,
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
        active={showCompleted}
        onClick={() => onToggleShowCompleted()}
    />;

    const reordererModeButton = <ToolbarButton
        className="fas fa-sort"
        active={reorderMode}
        onClick={() => onToggleReorderMode()}
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
            {reordererModeButton}
            {showCompletedButton}
        </div>
    </PageTopNavbar>
});

export default TodoListPageNavbar