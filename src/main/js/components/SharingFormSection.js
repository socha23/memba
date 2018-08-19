import React from 'react'
import PropTypes from 'prop-types';
import todoLogic from '../logic/todoLogic'
import FormSectionContainer from "./FormSectionContainer";

class SharingFormSection extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        value: PropTypes.array.isRequired,
        onChangeValue: PropTypes.func.isRequired,
    };

    state = {
        modalShown: false
    };

    isSharingEnabled() {
        return todoLogic.isTopLevel(this.props.item)
    }

    render() {
        if (!this.isSharingEnabled()) {
            return <span/>
        }

        return <div>
            <FormSectionContainer>
                <span>Shared with: (none)</span>
                <button className="btn btn-primary" onClick={() => {
                    this.setState({modalShown: true})
                }}>
                    Share
                </button>
            </FormSectionContainer>
        </div>;

    };
}

class SharingModal extends React.Component {
    render() {
        
    }
}

export default SharingFormSection;