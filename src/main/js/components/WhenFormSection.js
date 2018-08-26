import React from 'react'
import PropTypes from 'prop-types'

import Modal, {ModalHeader} from "./Modal";
import FormSectionContainer from './FormSectionContainer'
import ButtonIcon from "./ButtonIcon";
import moment from 'moment'

class WhenFormSection extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func,
    };

    static defaultProps = {
        onChangeValue: () => {}
    };

    state = {
        modalShown: false,
        currentValue: "",
    };

    constructor(params) {
        super(params);
        this.state = {
            modalShown: false,
            dateFieldValue: extractDateFromValue(params.value),
            timeFieldValue: extractTimeFromValue(params.value),
        }

    }

    describeValue() {
        if (this.props.value == null || this.props.value === "") {
            return " (not set)"
        } else {
            return moment(this.props.value).format("YYYY.MM.DD HH:mm")
        }
    }
    
    render() {
        return <div>
            <FormSectionContainer onClick={() => {
                this.setState({modalShown: true})
            }}>
                When: {this.describeValue()}
            </FormSectionContainer>
            <Modal
                visible={this.state.modalShown}
                dialogClassName="modal-dialog-centered"
                onCancel={() => {
                    this.onCancel()
                }}>
                <ModalHeader title="Choose when" onCancel={() => {this.onCancel()}}/>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            placeholder="Enter date"
                            className="form-control form-control-lg"
                            type="date"
                            value={this.state.dateFieldValue} onChange={e => {this.onChangeDate(e.target.value)}}/>

                    </div>
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            placeholder="Enter time"
                            className="form-control form-control-lg"
                            type="text"
                            value={this.state.timeFieldValue} onChange={e => {this.onChangeTime(e.target.value)}}/>

                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary btn-block btn-lg" onClick={() => this.onSave()}>
                        <ButtonIcon className={"fas fa-check"}/>
                        OK
                    </button>
                </div>

            </Modal>
        </div>;
    }

    onCancel() {
        this.setState({modalShown: false});
    }

    onChangeDate(dateV) {
        this.setState({dateFieldValue: dateV});
    }

    onChangeTime(timeV) {
        this.setState({timeFieldValue: timeV});
    }

    onSave() {
        this.setState({modalShown: false});
        const value = parseDateTime(this.state.dateFieldValue, this.state.timeFieldValue);
        this.props.onChangeValue(value ? value.toISOString() : null);
    }
}

export default WhenFormSection

function extractDateFromValue(isoDate) {
    const m = moment(isoDate);
    return isoDate != null && m.isValid() ? m.format("YYYY-MM-DD") : ""
}

function extractTimeFromValue(isoDate) {
    const m = moment(isoDate);
    return isoDate != null && m.isValid() ? m.format("HH:mm") : ""
}

export function parseDateTime(dateS, timeS) {
    function normalizeTime(s) {
        switch (s.length) {
            case 1:
                s = "0" + s + ":00";
                break;
            case 2:
                s = s + ":00";
                break;
            case 3:
                s = "0" + s.substring(0, 1) + ":" + s.substring(1, 3);
                break;
            case 4:
                s = s.substring(0, 2) + ":" + s.substring(2, 4);
        }
        return s;
    }

    const m = moment(dateS + "T" + normalizeTime(timeS));
    return m.isValid() ? m : null;
}

