import React from 'react'
import PropTypes from 'prop-types'

import FormSectionContainer from './FormSectionContainer'
import moment from 'moment'
import Calendar from "./Calendar";
import MyModal from "./Modal";
import ButtonIcon from "./ButtonIcon";
import TimePicker from "./TimePicker";

class WhenFormSection extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func,
    };

    static defaultProps = {
        onChangeValue: () => {}
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

    render() {


        return <div>
        <FormSectionContainer onClick={() => {this.showModal()}}>
                        When: {this.describeValue()}
        </FormSectionContainer>
        <MyModal dialogClassName="modal-dialog-centered" visible={this.state.modalShown} onCancel={() => {this.hideModal()}}>
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
                            <div/>
                            <TimePicker
                                value={this.currentValue().format("HH:mm")}
                                onChangeValue={this.onChangeTime}
                            />
                            <div></div>
                            <div style={{position: "absolute", right: 10, bottom: 1}} onClick={() => {this.onClear()}}>
                                <i className={"fas fa-times"} style={{marginRight: 4}}/>
                                Clear
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
        </MyModal>

        </div>;
    }


    showModal() {
        let value = this.currentValue();
        if (!value) {
            value = this.defaultValue();
            this.props.onChangeValue(value.toISOString());
        }
        console.log(value);
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

