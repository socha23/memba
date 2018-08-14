import React from 'react'
import PropTypes from 'prop-types'

import {encodeQuery, withRouterWithQuery} from "../routerUtils";
import Modal from 'react-bootstrap4-modal'

import todoLogic from '../logic/todoLogic'
import ButtonIcon from './ButtonIcon'

import LongClickButton from "./LongClickButton";

class AddItemButton extends React.Component {

    static propTypes = {
        groupId: PropTypes.string,
    };

    static defaultProps = {
        groupId: todoLogic.ROOT_GROUP_ID
    };

    state = {
        modalShown: false,
    };

    onCancel() {
        this.hideModal();
    }

    onAddTodo() {
        this.hideModal();
        this.props.history.push(encodeQuery("/addTodo", {groupId: this.props.groupId}))
    }

    onAddGroup() {
        this.hideModal();
        this.props.history.push(encodeQuery("/addGroup", {groupId: this.props.groupId}))
    }

    hideModal() {
        this.setState({modalShown: false});
    }

    render() {
        return <div style={{width: "100%"}}>
        <div className="btn-group btn-block">
            <LongClickButton
                className="btn btn-info btn-lg btn-block"
                onClick={() => {
                    this.onAddTodo()
                }}
                onLongClick={() => {
                    this.setState({modalShown: true})
                }}
            >
                <ButtonIcon className="fas fa-plus"/>Add new item
            </LongClickButton>
            <button
                className="btn btn-info btn-lg"
                onClick={() => {this.setState({modalShown: true})}}
            >
                <i style={{fontSize: 30}} className="fas fa-align-justify"/>
            </button>
        </div>
        <AddModal
            visible={this.state.modalShown}
            onClickBackdrop={() => {
                this.onCancel()
            }}
            onAddTodo={() => this.onAddTodo()}
            onAddGroup={() => this.onAddGroup()}
        />
        </div>
    }
}

const AddModal = ({visible, onClickBackdrop, onAddTodo, onAddGroup}) =>
    <Modal visible={visible} dialogClassName="modal-dialog-centered" onClickBackdrop={onClickBackdrop}>
        <div className="modal-body">
            <button className="btn btn-block btn-lg btn-secondary" onClick={onAddTodo}>
                Add new item
            </button>
            <button className="btn btn-block btn-lg btn-secondary" onClick={onAddGroup}>
                Add new list
            </button>
        </div>
    </Modal>;


export default withRouterWithQuery(AddItemButton)


