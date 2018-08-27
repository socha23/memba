import React from 'react'
import PropTypes from 'prop-types'

import FormSectionContainer from './FormSectionContainer'
import moment from 'moment'
import Calendar from "./Calendar";
import MyModal from "./Modal";
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

                <Calendar value={this.currentValue().startOf("day")} onChangeValue={d => {this.onChangeDate(d)}}/>
                    : <div/>}
            </div>


            <div style={{
                margin: 4,
            }}>
                <div style={{width: "100%", display: "flex", justifyContent: "space-between", cursor: "pointer"}}>
                    <div/>
                    <div style={{padding: 4, paddingLeft: 10}} onClick={() => {this.onClear()}}>
                        <i className={"fas fa-times"} style={{marginRight: 4}}/>
                        Clear
                    </div>
                </div>
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
            this.onChangeDate(value);
        }
        this.setState({
            modalShown: true,
        });
    }

    hideModal() {
        this.setState({modalShown: false});
    }

    onChangeDate(d) {
        this.props.onChangeValue(d.toISOString());
    }

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

