import React from 'react'

import todoLogic from '../../../logic/todoLogic'
import PageBody from '../../structural/PageBody'
import AnimatedList from '../../AnimatedList'
import TodoListItem from '../../TodoListItem'
import GroupListItem from '../../GroupListItem'


function swapGroup(idA, idB) {
    console.log("swapping group", idA, idB);
}

function swapTodo(idA, idB) {
    console.log("swapping todo", idA, idB);
}

const TodoListPageViewReorderMode = ({
                                         history,
                                         groups = [],
                                         todos = [],
                                     }) => {

    return <PageBody>
        <AnimatedList>
            {groups.map((g, idx) => {
                const first = (idx === 0);
                const last = (idx === groups.length - 1);
                return <GroupListItem key={g.id} group={g}>
                        <div>
                            {first ? <None/> :
                                <Icon className="fas fa-chevron-up" onClick={() => {swapGroup(g.id, groups[idx - 1].id)}}/>}
                            {last ? <None/> :
                                    <Icon className="fas fa-chevron-down" onClick={() => {swapGroup(g.id, groups[idx + 1].id)}}/>}
                        </div>
                    </GroupListItem>
                })}
        </AnimatedList>
        <AnimatedList>
            {todos.map((t, idx) => {
                const first = (idx === 0);
                const last = (idx === todos.length - 1);
                return <TodoListItem key={t.id} todo={t}>
                    <div>
                        {first ? <None/> :
                            <Icon className="fas fa-chevron-up" onClick={() => {swapTodo(t.id, todos[idx - 1].id)}}/>}
                        {last ? <None/> :
                            <Icon className="fas fa-chevron-down"  onClick={() => {swapTodo(t.id, todos[idx + 1].id)}}/>}
                    </div>
                </TodoListItem>
            })}
        </AnimatedList>
    </PageBody>
};

const None = () => <div style={{width: 36, display: "inline-block"}}/>;

const Icon = ({className, onClick = () => {}}) =>
    <i className={className}
       style={{fontSize: 30, padding: 5}}
       onClick={onClick}
    />;



export default TodoListPageViewReorderMode

