import React from 'react'

import moment from 'moment';
import {encodeQuery, withRouterWithQuery} from "../routerUtils";
import todoLogic from '../logic/todoLogic'

import {ToolbarButton} from "./structural/PageTopNavbar";


const DeadlinesButton = withRouterWithQuery(({history}) => {
    const number = numberToDisplay();
        return <div style={{
            position: "relative"
        }}>
            <ToolbarButton
                className="far fa-calendar-alt"
                onClick={() => {
                    history.push(encodeQuery("/deadlines"))
                }}
            />
            {number === 0 ? <span/> : <span className={"badge badge-pill " + numberClass()} style={{
                fontSize: 12,
                position: "absolute",
                bottom: 0,
                right: -4,
                cursor: "pointer",
            }}>{number}</span>}
        </div>;
});

function numberToDisplay() {
    return todoLogic.listTodosWithDeadlines().length
}

function numberClass() {
    const date = earliestDeadline();
    const endOfToday = moment().endOf("day");
    const closestWeekEnd = endOfToday.clone().add(6, "days");

    if (date.isBefore(endOfToday)) {
        return "badge-danger"
    } else if (date.isBefore(closestWeekEnd)) {
        return "badge-warning"
    } else {
        return "badge-secondary"
    }
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