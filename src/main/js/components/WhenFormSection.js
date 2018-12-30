import React from 'react'
import PropTypes from 'prop-types'

import FormSectionContainer from './FormSectionContainer'
import moment from 'moment'
import WhenLabel from "./WhenLabel"
import DateTimePickerModal from "./DateTimePickerModal";

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

    renderDescribeValue() {
        const val = this.currentValue();
        if (!val) {
            return " (not set)"
        } else {
            return <WhenLabel when={val}/>
        }
    }

    render() {
        return <div>
            <FormSectionContainer style={this.props.style} onClick={() => {this.modal.open()}}>
                <span>
                    When: {this.renderDescribeValue()}
                </span>
            </FormSectionContainer>
            <DateTimePickerModal ref={m => {this.modal = m}} value={this.props.value} onChangeValue={this.props.onChangeValue}/>
        </div>;
    }

    currentValue() {
        if (!this.props.value || !moment(this.props.value).isValid()) {
            return null;
        }
        return moment(this.props.value);

    }
}


export default WhenFormSection

