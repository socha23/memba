import React from 'react'
import PropTypes from 'prop-types'

import Modal, {ModalHeader} from "./Modal";
import FormSectionContainer from './FormSectionContainer'
import ButtonIcon from "./ButtonIcon";

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
    
    render() {
        return <div>
            <FormSectionContainer onClick={() => {
                this.setState({modalShown: true, currentValue: this.props.value || ""})
            }}>
                When: (not set)
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

    onSave(value) {
        console.log(this.s);
        this.setState({modalShown: false});
        this.props.onChangeValue(value);
    }
}

export default WhenFormSection
