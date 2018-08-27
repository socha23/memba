import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Calendar extends React.Component {

    static propTypes = {
        value: PropTypes.object,
        onChangeValue: PropTypes.func
    };

    static defaultProps = {
        value: moment(),
        onChangeValue: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            displayedMonth: moment().startOf("month")
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({displayedMonth: (this.props.value || moment()).clone().startOf("month")})
        }

    }

    render() {
        let value = this.props.value || moment();
        return <CalendarGrid
                    value={value}
                    onClickDay={d => {this.onClickDay(d)}}
                    month={getMonth(this.state.displayedMonth)}
                    onClickPrevMonth={() => {this.onPrevMonth()}}
                    onClickNextMonth={() => {this.onNextMonth()}}
        />
    }

    onClickDay(day) {
        this.props.onChangeValue(day);
    }

    onPrevMonth() {
        this.setState({displayedMonth: this.state.displayedMonth.clone().subtract(1, "month")});
    }

    onNextMonth() {
        this.setState({displayedMonth: this.state.displayedMonth.clone().add(1, "month")});
    }

}

const CalendarGrid = ({
                          month,
                          value,
                          onClickDay =() => {},
                          onClickPrevMonth =() => {},
                          onClickNextMonth =() => {},

                      }) => <div
    style={{
        minWidth: 300,
        maxWidth: 600,
        fontSize: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}
>
    <div style={ROW_STYLE}>
        <i className={"fas fa-caret-left"}
           style={{color: "white", marginLeft: 5, fontSize: 30, paddingRight: 40}}
               onClick={onClickPrevMonth}/>
        <span>{month.month.format("MMMM YYYY")}</span>
        <i className={"fas fa-caret-right"}
           style={{color: "white", marginRight: 5, fontSize: 30, paddingLeft: 40}}
           onClick={onClickNextMonth}/>
    </div>


    <div style={ROW_STYLE}>
        {
            month.weeks[0].days.map(d => <DayName key={d.key} day={d.day}/>)
        }
    </div>
    {
        month.weeks.map(w =>
            <div
                key={w.key}
                style={ROW_STYLE}
            >
            {
                w.days.map(d =>
                    <Day
                        key={d.key}
                        day={d.day}
                        value={value}
                        onClick={() => {onClickDay(d.day)}}
                        month={month.month}
                    />
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

const Day = ({day, month, value, onClick}) => <div
    style={{
        ...CELL_STYLE,
        cursor: "pointer"
    }}
    onClick={() => {onClick()}}
>
    <div style={dayContainerStyle(day, value)}>
        <span style={dayLettersStyle(day, month)}>{day.format("D")}</span>
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

function dayLettersStyle(day, month) {
    const style = {color: "white"};

    if (day.isoWeekday() === 6 || day.isoWeekday() === 7) {
        style.color = "red"
    }
    
    if (!day.isSame(month, "month")) {
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
    return {month: value, weeks: weeks};
}


export default Calendar