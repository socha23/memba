import React from 'react'
import PropTypes from 'prop-types';
import FormSectionContainer from "./FormSectionContainer";
import Modal, {ModalHeader} from "./Modal";
import ButtonIcon from "./ButtonIcon";
import sharingLogic from '../logic/sharingLogic'
import todoLogic from '../logic/todoLogic'


class SharingFormSection extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        value: PropTypes.array.isRequired,
        onChangeValue: PropTypes.func.isRequired,
    };

    state = {
        modalShown: false,
        currentValue: [],
    };

    isSharingEnabled() {
        return todoLogic.isTopLevel(this.props.item)
    }

    onCancel() {
        this.setState({modalShown: false, currentValue: [...this.props.value]});
    }

    onSave() {
        this.setState({modalShown: false});
        this.props.onChangeValue(this.state.currentValue);
    }

    onShowModal() {
        this.setState({
            currentValue: [...this.props.value],
            modalShown: true,
        });
    }

    isSharedWith(userId) {
        return this.state.currentValue.includes(userId);
    }

    toggleSharedWith(userId) {
        var newCurrent = [...this.state.currentValue];
        if (this.isSharedWith(userId)) {
            // unshare
            newCurrent.splice(newCurrent.indexOf(userId), 1);
        } else {
            // share
            newCurrent.push(userId);
        }
        this.setState({currentValue: newCurrent})
    }


    render() {
        if (!this.isSharingEnabled()) {
            return <span/>
        }

        return <div>
            <FormSectionContainer>
                <span>
                    Shared with:
                    {sharingLogic.getUsersItemIsSharedWith(this.props.item)
                        ? "(none)" : sharingLogic.getUsersItemIsSharedWithDescShort(this.props.item)
                    }
                    </span>
                <button className="btn btn-primary" onClick={() => {this.onShowModal()}}>
                    Share
                </button>
            </FormSectionContainer>

            <Modal visible={this.state.modalShown} onHide={() => {this.onSave()}}>
                <ModalHeader
                    title={"Share '" + this.props.item.text + "' with..."}
                    onCancel={() => {this.onCancel()}}
                />
                <div className="modal-body" style={{padding: 0}}>
                    {
                        sharingLogic.getAllFriends().map(f =>
                            <FriendListItem
                                key={f.id}
                                friend={f}
                                selected={this.isSharedWith(f.id)}
                                onToggleSelected={() => {this.toggleSharedWith(f.id)}}
                            />)
                    }
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary btn-block btn-lg" onClick={() => this.onSave()}>
                        <ButtonIcon className={"fas fa-check"}/>
                        OK
                    </button>
                </div>


            </Modal>
        </div>;

    };
}

const FriendListItem = ({friend, selected, onToggleSelected}) => {
    const color = selected ? "white" : "#888";

    return <div
        style={{
            color: color,
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 8,
            cursor: "pointer",
        }}
        onClick={onToggleSelected}
    >
        <div style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            border: "3px solid " + color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10
        }}>
            <img src={friend.pictureUrl} style={{
                width: 40,
                height: 40,
                borderRadius: 20,
            }}/>
        </div>

        <span style={{fontSize: 24, flexGrow: 1}}>
            {friend.fullName}

        </span>
        <div>
            <i style={{fontSize: 40}} className={selected ? "far fa-check-square" : "far fa-square"}/>
        </div>
    </div>

};


export default SharingFormSection;