import React from 'react'
import moment from 'moment'

class Calendar extends React.Component {

    state = {
        value: moment()
    };

    render() {
        const value = moment(this.state.value);
        return <CalendarGrid
                    value={this.state.value}
                    onClickDay={d => {this.setState({value: d})}}
                    month={getMonth(value)}/>
    }
}

const CalendarGrid = ({month, value, onClickDay =() => {}}) => <div
    style={{
        minWidth: 300,
        maxWidth: 600,
        fontSize: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}
>
    <div>
        {value.format("MMMM YYYY")}
    </div>


    <div style={ROW_STYLE}>
        {
            month[0].days.map(d => <DayName key={d.key} day={d.day}/>)
        }
    </div>
    {
        month.map(w =>
            <div
                key={w.key}
                style={ROW_STYLE}
            >
            {
                w.days.map(d =>
                    <Day key={d.key} day={d.day} value={value} onClick={() => {onClickDay(d.day)}}/>
                )
            }
            </div>
        )
    }
</div>;

const ROW_STYLE = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "none",
    justifyContent: "space-between"
};

const CELL_STYLE = {
    height: 35,
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
};

const Day = ({day, value, onClick}) => <div
    style={{
        ...CELL_STYLE,
        cursor: "pointer"
    }}
    onClick={() => {onClick()}}
>
    <div style={dayContainerStyle(day, value)}>
        <span style={dayLettersStyle(day)}>{day.format("D")}</span>
    </div>
</div>;

const DayName = ({day}) => <div style={{...CELL_STYLE}}>
    <span>{day.format("dd")}</span>
</div>;

function dayContainerStyle(day, value) {
    const style = {
        width: 40,
        borderRadius: 20,
        padding: 3,
        textAlign: "center"
    };

    if (value && day.isSame(value, "day")) {
        style.border = "3px solid red";
    }

    if (day.isSame(moment(), "day")) {
        style.backgroundColor = "rgb(91, 192, 222)"
    }
    return style;
}

function dayLettersStyle(day) {
    const style = {color: "white"};

    if (day.isoWeekday() === 6 || day.isoWeekday() === 7) {
        style.color = "red"
    }
    
    if (!day.isSame(moment(), "month")) {
          style.color = "#888"
    }

    return style;
}

function getMonth(value) {
    if (!value || !value.isValid()) {
        return [];
    }
    const weekFrom = moment(value).startOf("month").startOf("isoWeek");
    const weekTo = moment(value).endOf("month").startOf("isoWeek");

    const weeks = [];

    let currentWeek = weekFrom.clone();
    while (!currentWeek.isAfter(weekTo)) {
        const days = [];
        let currentDay = currentWeek.clone();
        const dayTo = currentWeek.clone().endOf("isoWeek");
        while(!currentDay.isAfter(dayTo)) {
            days.push({key: currentDay.toISOString(), day: currentDay.clone()});
            currentDay.add(1, "day");
        }
        weeks.push({key: currentWeek.toISOString(), days: days, week: currentWeek.clone()});
        currentWeek.add(1, "week");
    }
    return weeks;
}


export default Calendar