import React from 'react'

import moment from 'moment';
import {encodeQuery, withRouterWithQuery} from "../routerUtils";
import todoLogic from '../logic/todoLogic'
import deadlineColor from '../deadlineColors'

import {ToolbarButton} from "./structural/PageTopNavbar";


const DeadlinesButton = withRouterWithQuery(({history}) => {
    const number = numberToDisplay();
        return <div style={{
            position: "relative"
        }}
            onClick={() => {
                history.push(encodeQuery("/deadlines"))
            }}
        >
            <ToolbarButton
                className="far fa-calendar-alt"
            />
            {number === 0 ? <span/> : <span className={"badge badge-pill"} style={{
                fontSize: 12,
                position: "absolute",
                bottom: 0,
                right: -4,
                cursor: "pointer",
                backgroundColor: numberColor(),
                color: "white",
            }}>{number}</span>}
        </div>;
});

function numberToDisplay() {
    return todoLogic.listTodosWithDeadlines().length
}

function numberColor() {
    return deadlineColor(earliestDeadline());
}

function earliestDeadline() {
    const todos =  todoLogic.listTodosWithDeadlines();
    if (todos.length === 0) {
        return moment()
    } else {
        return moment(todos[0].when)
    }
}

export default DeadlinesButton;