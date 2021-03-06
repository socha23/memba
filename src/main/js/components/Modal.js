import React from 'react'
import PropTypes from 'prop-types'

import Modal from "react-bootstrap4-modal";
import {pushModal, popModal} from '../modals'

class MyModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        if (props.visible) {
            pushModal(this);
        }
    }

    render() {
        return <Modal
            dialogClassName={this.props.dialogClassName}
            visible={this.props.visible}
            onClickBackdrop={() => {this.hide()}}
        >
            {this.props.children}
        </Modal>;
    }

    hide() {
        this.props.onCancel();
    }

    isShown() {
        return this.props.visible;
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            pushModal(this);
        }
        if (!this.props.visible && prevProps.visible) {
            popModal(this);
        }
    }

}

export default MyModal;

export const ModalHeader = ({title, onCancel}) => <div className="modal-header">
    <h5 className="modal-title">{title}</h5>
    <i style={{fontSize: 30, cursor: "pointer"}} className="fas fa-times" onClick={onCancel}/>
</div>;

