import React from 'react'

import PageBody from '../../structural/PageBody'
import AnimatedList from '../../AnimatedList'
import TodoListItem from '../../TodoListItem'
import GroupListItem from '../../GroupListItem'

const TodoListPageViewReorderMode = ({
                                         groups = [],
                                         todos = [],
                                         onSwapGroups = (a, b) => {},
                                         onSwapTodos = (a, b) => {},
                                     }) => {
    return <PageBody>
        <AnimatedList>
            {groups.map((g, idx) => {
                const first = (idx === 0);
                const last = (idx === groups.length - 1);
                return <GroupListItem key={g.id} group={g}>
                    <div style={{display: "flex", flexWrap: "nowrap"}}>
                        {first ? <None/> :
                            <Icon className="fas fa-chevron-up"
                                  onClick={() => {onSwapGroups(idx, idx - 1)}}/>}
                        {last ? <None/> :
                            <Icon className="fas fa-chevron-down"
                                  onClick={() => {onSwapGroups(idx, idx + 1)}}/>}
                    </div>
                </GroupListItem>
            })}
        </AnimatedList>
        <AnimatedList>
            {todos.map((t, idx) => {
                const first = (idx === 0);
                const last = (idx === todos.length - 1);
                return <TodoListItem key={t.id} todo={t}>
                    <div style={{display: "flex", flexWrap: "nowrap"}}>
                        {first ? <None/> :
                            <Icon className="fas fa-chevron-up"
                                  onClick={() => {onSwapTodos(idx, idx - 1)}}/>}
                        {last ? <None/> :
                            <Icon className="fas fa-chevron-down"
                                  onClick={() => {onSwapTodos(idx, idx + 1)}}/>}
                    </div>
                </TodoListItem>
            })}
        </AnimatedList>
        <div style={{height: 100}}/>
    </PageBody>
};

const None = () => <div style={{width: 36, display: "inline-block"}}/>;

const Icon = ({className, onClick = () => {}}) =>
    <i className={className}
       style={{fontSize: 30, padding: 5, cursor: "pointer"}}
       onClick={onClick}
    />;


export default TodoListPageViewReorderMode

