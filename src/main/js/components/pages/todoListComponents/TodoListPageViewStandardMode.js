import React from 'react'

import {withRouterWithQuery, encodeQuery} from '../../../routerUtils'
import todoLogic from '../../../logic/todoLogic'
import PageBody from '../../structural/PageBody'
import AnimatedList from '../../AnimatedList'
import TodoListItem from '../../TodoListItem'
import GroupListItem from '../../GroupListItem'

const TodoListPageViewStandardMode = ({
                                          history,
                                          groupId = todoLogic.ROOT_GROUP_ID,
                                          showCompleted = false,
                                      }) => {

    const groups = todoLogic.listGroups({groupId: groupId});
    const todos = todoLogic.listTodos({groupId: groupId, showCompleted: showCompleted});

    return <PageBody>
        <AnimatedList>
            {groups.map(g => <GroupListItem
                    key={g.id}
                    group={g}
                    onClick={() => { history.push(encodeQuery("/", {groupId: g.id}))}}>
                    <i
                        style={{fontSize: 40}}
                        className={"fas fa-chevron-right"}
                        onClick={() => { history.push(encodeQuery("/", {groupId: g.id}))}}
                    />
                </GroupListItem>
            )}
        </AnimatedList>
        <AnimatedList>
            {todos.map(t => <TodoListItem
                key={t.id}
                todo={t}
                onClick={() => { history.push(encodeQuery("/todo/" + t.id, {groupId: t.id})) }}
            >
                <div style={{cursor: "pointer"}} onClick={() => todoLogic.setCompleted(t.id, !t.completed)}>
                    <i style={{fontSize: 40}} className={"far " + (t.completed ? "fa-check-square" : "fa-square")}/>
                </div>
            </TodoListItem>)}
        </AnimatedList>
    </PageBody>
};

export default withRouterWithQuery(TodoListPageViewStandardMode)

