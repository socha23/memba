import React from 'react'

import {encodeQuery, withRouterWithQuery} from '../../../routerUtils'
import todoLogic from '../../../logic/todoLogic'
import PageBody from '../../structural/PageBody'
import AnimatedList from '../../AnimatedList'
import TodoListItem from '../../TodoListItem'
import GroupListItem from '../../GroupListItem'

const TodoListPageViewStandardMode = ({
                                          history,
                                          groups = [],
                                          todos = [],
                                      }) => {

    return <PageBody>
        <AnimatedList>
            {groups.map(g => <GroupListItem
                    key={g.id}
                    group={g}
                    onClick={() => { history.push(encodeQuery("/", {groupId: g.id}))}}>

                {todoLogic.countNotCompletedInGroup(g.id) === 0 ? <span/> : <span
                    style={{
                        fontSize: 34,
                        fontWeight: 600,
                        marginRight: 6,
                        marginLeft: 6,
                    }}
                >{todoLogic.countNotCompletedInGroup(g.id)}</span>}
                </GroupListItem>
            )}
        </AnimatedList>
        <AnimatedList>
            {todos.map(t => <TodoListItemWithCheckbox
                key={t.id}
                todo={t}
            />)}
        </AnimatedList>
        <div style={{height: 100}}/>
    </PageBody>
};

export const TodoListItemWithCheckbox = withRouterWithQuery(({history, todo, backTo="/"}) => <TodoListItem
                todo={todo}
                onClick={() => { history.push(encodeQuery("/todo/" + todo.id, {backTo: backTo, groupId: todo.id})) }}
            >
                <div style={{cursor: "pointer"}} onClick={() => todoLogic.setCompleted(todo.id, !todo.completed)}>
                    <i style={{fontSize: 40}} className={"far " + (todo.completed ? "fa-check-square" : "fa-square")}/>
                </div>
            </TodoListItem>);

export default withRouterWithQuery(TodoListPageViewStandardMode)

