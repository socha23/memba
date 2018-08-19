import React from 'react'
import PropTypes from 'prop-types'

import Modal from "react-bootstrap4-modal";
import {pushModal, popModal} from '../modals'

class MyModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired,
    };

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
        this.props.onHide();
    }

    isShown() {
        return this.props.visible;
    }

    componentDidMount() {
        pushModal(this);
    }

    componentWillUnmount() {
        popModal(this);
    }

}

export default MyModal;

export const ModalHeader = ({title, onCancel}) => <div className="modal-header">
    <h5 className="modal-title">{title}</h5>
    <i style={{fontSize: 30, cursor: "pointer"}} className="fas fa-times" onClick={onCancel}/>
</div>;

