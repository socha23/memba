import React from 'react'
import PropTypes from 'prop-types'

import Modal, {ModalHeader} from "./Modal";
import FormSectionContainer from './FormSectionContainer'
import backgrounds, {backgroundNoneValue} from '../backgrounds'

class BackgroundSelectFormSection extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func.isRequired,
    };

    state = {
        modalShown: false
    };

    getValue() {
        const val = this.props.value;
        if (backgrounds.find(b => b.value === val)) {
            return val
        } else {
            return backgrounds[0].value
        }
    }

    backgroundName(val) {
        const bg = backgrounds.find(b => b.value === val);
        if (bg == null) {
            return backgrounds[0].name;
        } else {
            return bg.name;
        }
    }

    render() {
        return <div>
            <FormSectionContainer>
                <span>
                    Background: {this.backgroundName(this.getValue())}
                </span>
                <button className="btn btn-primary" onClick={() => {
                                this.setState({modalShown: true})
                            }}>
                    Choose
                </button>
            </FormSectionContainer>

            <Modal
                visible={this.state.modalShown}
                dialogClassName="modal-dialog-centered"
                onHide={() => {this.onCancel()}}>

                <ModalHeader title="Choose background" onCancel={() => {this.onCancel()}}/>

                <div className="modal-body">
                    {
                        backgrounds.map(g =>
                            <div key={g.value}>
                                <div
                                    onClick={() => {this.onSelect(g.value)}}
                                    style={{
                                        border: g.value === this.getValue() ? "2px solid white": "2px solid transparent",
                                        borderRadius: 4,
                                        cursor: "pointer",
                                        marginTop: -2,
                                        marginBottom: -2,
                                    }}>
                                        <div style={{
                                            minHeight: 60,
                                            margin: 2,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center bottom",
                                            backgroundSize: "cover",
                                            backgroundColor: "black",
                                            backgroundImage: g.value === backgroundNoneValue ? "none" : "url('backgrounds/" + g.value + "')",
                                        }}/>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Modal>
            </div>;
    }

    onCancel() {
        this.setState({modalShown: false});
    }

    onSelect(value) {
        this.setState({modalShown: false});
        this.props.onChangeValue(value);
    }
}

export default BackgroundSelectFormSection
