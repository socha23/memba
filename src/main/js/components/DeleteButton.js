import React from 'react'
import PropTypes from 'prop-types'

import {encodeQuery, withRouterWithQuery} from "../routerUtils";
import Modal from 'react-bootstrap4-modal'

import ButtonIcon from './ButtonIcon'

class DeleteButton extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        buttonTitle: PropTypes.string,
        style: PropTypes.object,
        message: PropTypes.string,
        item: PropTypes.object.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    static defaultProps = {
        style: {},
        buttonTitle: "Delete item",
        message: "Are you sure you want to delete this item?"
    };

    state = {
        confirmShown: false,
    };

    onConfirm() {
        this.props.onDelete(this.props.item);
        this.props.history.push(encodeQuery("/", {groupId: this.props.item.groupId}))
    }

    onCancel() {
        this.setState({confirmShown: false});
    }

    render() {
        return <div>
            <button style={{...this.props.style}} className="btn btn-block btn-danger" onClick={() => this.setState({confirmShown: true})}>
            <ButtonIcon className="fas fa-trash-alt"/>
                {this.props.buttonTitle}
            </button>
            <Modal
                visible={this.state.confirmShown}
                dialogClassName="modal-dialog-centered"
                onClickBackdrop={() => {this.onCancel()}}>
                <div className="modal-header">
                    <h5 className="modal-title">{this.props.message}</h5>
                </div>
                <div className="modal-body">
                    <button className="btn btn-block btn-lg btn-danger" onClick={() => {this.onConfirm()}}>
                        <ButtonIcon className="fas fa-trash-alt"/>
                        Yes, delete
                    </button>
                    <button className="btn btn-block btn-lg btn-secondary" onClick={() => {this.onCancel()}}>
                        <ButtonIcon className="fas fa-ban"/>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    }
}

export default withRouterWithQuery(DeleteButton)


