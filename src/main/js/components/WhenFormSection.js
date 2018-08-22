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
                this.setState({modalShown: true, currentValue: this.isoToInput(this.props.value)})
            }}>
                When: {this.describeValue()}
            </FormSectionContainer>
            <Modal
                visible={this.state.modalShown}
                dialogClassName="modal-dialog-centered"
                onHide={() => {
                    this.onCancel()
                }}>
                <ModalHeader title="Choose when" onCancel={() => {this.onCancel()}}/>

                <div className="modal-body">
                    <input
                        placeholder="Enter date and time"
                        className="form-control form-control-lg"
                        type={"datetime-local"}
                        value={this.state.currentValue} onChange={e => {this.setState({currentValue: e.target.value})}}/>
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

    onSave() {
        this.setState({modalShown: false});
        this.props.onChangeValue(this.inputToIso(this.state.currentValue));
    }

    inputToIso(val) {
        return val && moment(val).toISOString()
    }

    isoToInput(val) {
        return val && moment(val).format(moment.HTML5_FMT.DATETIME_LOCAL)
    }

}

export default WhenFormSection
