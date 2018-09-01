import React from 'react'
import PropTypes from 'prop-types'

import FormSectionContainer from './FormSectionContainer'
import moment from 'moment'
import Calendar from "./Calendar";
import Modal from "./Modal";
import ButtonIcon from "./ButtonIcon";
import TimePicker from "./TimePicker";

class WhenFormSection extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        onChangeValue: () => {},
        style: {},

    };

    state = {
        modalShown: false
    };

    describeValue() {
        if (!this.currentValue()) {
            return " (not set)"
        } else {
            return this.currentValue().format("YYYY.MM.DD HH:mm")
        }
    }

    renderDayLink = (day, children) => {
        return <a style={{
                cursor: "pointer",
                color: day.isSame(this.currentValue(), "day") ? "white" : "#888"
            }}
               onClick={() => {this.onChangeDate(day)}}
               >
                {children}
            </a>
    };

    renderTimeLink = (time, children) => {
        return <a style={{
                cursor: "pointer",
                color: this.currentValue().format("HH:mm") === time ? "white" : "#888"
            }}
                  key={time}
                  onClick={() => {this.onChangeTime(time)}}
               >
                {children}
            </a>
    };

    renderFridayLink = () => {
        const today = moment();
        let description = "Friday";
        let day = moment().isoWeekday(5);
        if (today.isoWeekday() === 4 || today.isoWeekday() === 5) {
            day.add(1, "week");
            description = "Next Friday";
        } else if (today.isoWeekday() === 6 || today.isoWeekday() === 7) {
            day.add(1, "week");
        }
        return this.renderDayLink(day, <span>{description}</span>);
    };

    renderMondayLink = () => {
        const today = moment();
        let description = "Monday";
        let day = moment().isoWeekday(1).add(1, "week");
        if (today.isoWeekday() === 1) {
            description = "Next Monday";
        }
        return this.renderDayLink(day, <span>{description}</span>);
    };

    render() {


        return <div>
        <FormSectionContainer style={this.props.style} onClick={() => {this.showModal()}}>
                        When: {this.describeValue()}
        </FormSectionContainer>
        <Modal visible={this.state.modalShown} onCancel={() => {this.hideModal()}}>
            <div className="modal-body" style={{padding: 0}}>
                {this.currentValue() ?

                    <div>
                        <Calendar
                            value={this.currentValue().startOf("day")}
                            onChangeValue={d => {this.onChangeDate(d)}}
                            style={{
                                marginBottom: 10
                            }}
                        />
                        <div style={{
                            borderTop: "1px solid #666",
                            paddingTop: 10,
                            paddingLeft: 4,
                            paddingRight: 4,
                            display: "flex",
                            alignItems: "top",
                            justifyContent: "space-between",
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                fontSize: 16,
                                flexGrow: 1,
                                flexBasis: 0,
                            }}>
                                {this.renderDayLink(moment(), <span>Today</span>)}
                                {this.renderDayLink(moment().add(1, "day"), <span>Tomorrow</span>)}
                                {this.renderFridayLink()}
                                {this.renderMondayLink()}
                            </div>
                            <TimePicker
                                value={this.currentValue().format("HH:mm")}
                                onChangeValue={this.onChangeTime}
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                fontSize: 20,
                                textAlign: "right",
                                flexGrow: 1,
                                flexBasis: 0,
                            }}>
                                {this.renderTimeLink("09:00", <span>09:00</span>)}
                                {this.renderTimeLink("16:00", <span>16:00</span>)}
                                {this.renderTimeLink("22:00", <span>22:00</span>)}
                                <span onClick={() => {this.onClear()}}>Clear</span>
                            </div>
                        </div>

                    </div>

                    : <div/>}

            </div>


            <div style={{
                margin: 4,
            }}>
                <div style={{marginTop: 6}}>
                    <button className="btn btn-primary btn-block btn-lg" onClick={() => {this.hideModal()}}>
                        <ButtonIcon className={"fas fa-check"}/>
                        OK
                    </button>
                </div>

            </div>
        </Modal>

        </div>;
    }


    showModal() {
        let value = this.currentValue();
        if (!value) {
            value = this.defaultValue();
            this.props.onChangeValue(value.toISOString());
        }
        this.setState({
            modalShown: true,
        });
    }

    hideModal() {
        this.setState({modalShown: false});
    }

    onChangeDate = d => {
        const newVal = moment(this.props.value);
        newVal.year(d.get('year'));
        newVal.dayOfYear(d.get('dayOfYear'));
        this.props.onChangeValue(newVal.toISOString());
    };

    onChangeTime = t => {
        const time = moment(t, "HH:mm");
        const newVal = moment(this.props.value);
        newVal.hour(time.get('hour'));
        newVal.minute(time.get('minute'));
        newVal.startOf("minute");
        this.props.onChangeValue(newVal.toISOString());

    };

    onClear() {
        this.props.onChangeValue(null);
        this.hideModal();
    }

    defaultValue() {
        return moment()
    }

    currentValue() {
        if (!this.props.value || !moment(this.props.value).isValid()) {
            return null;
        }
        return moment(this.props.value);

    }
}


export default WhenFormSection

