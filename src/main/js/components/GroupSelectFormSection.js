import React from 'react'
import PropTypes from 'prop-types'

import Modal, {ModalHeader} from "./Modal";
import todoLogic from '../logic/todoLogic'
import {groupTreeAsListWithIdent} from "../logic/groupTree";
import FormSectionContainer from './FormSectionContainer'

class GroupSelectFormSection extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func.isRequired,
        disabledId: PropTypes.string,
    };

    state = {
        modalShown: false
    };


    render() {
        const myGroupId = this.props.value || todoLogic.ROOT_GROUP_ID;
        const rootGroup = {id: "root", text: "(none)", color: "black", ident: 0};
        const currentGroup = myGroupId === todoLogic.ROOT_GROUP_ID ? rootGroup : todoLogic.findGroupById(myGroupId);

        const allGroups = groupTreeAsListWithIdent(todoLogic.listGroups({groupId: ""}));
        allGroups.unshift(rootGroup);

        return <div>
            <FormSectionContainer onClick={() => {
                this.setState({modalShown: true})
            }}>
                List: {this.groupPath(currentGroup)}
            </FormSectionContainer>
            <Modal
                visible={this.state.modalShown}
                dialogClassName="modal-dialog-centered"
                onHide={() => {
                    this.onCancel()
                }}>
                <ModalHeader title="Move to list" onCancel={() => {this.onCancel()}}/>

                <div className="modal-body">
                    {
                        allGroups.map(g =>
                            <div key={g.id}>
                                <div
                                    onClick={() => {
                                        if (g.id === this.props.disabledId) {
                                            return;
                                        }
                                        this.onSelect(g.id)
                                    }}
                                    style={{
                                        border: g.id === this.props.value ? "2px solid white" : "2px solid transparent",
                                        borderRadius: 4,
                                        marginLeft: g.ident * 30,
                                        cursor: "pointer",
                                        marginTop: -2,
                                        marginBottom: -2,
                                    }}>
                                    <div style={{
                                        minHeight: 45,
                                        display: "flex",
                                        justifyContent: "space-around",
                                        backgroundColor: g.color,
                                        color: g.color === "black" ? "white" : "black",
                                        alignItems: "center",
                                        margin: 2,
                                    }}>
                                        <h4>{g.text}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Modal>
        </div>;
    }

    groupPath(group) {
        if (group.id === todoLogic.ROOT_GROUP_ID || group.groupId === todoLogic.ROOT_GROUP_ID) {
            return group.text
        } else {
            return this.groupPath(todoLogic.findGroupById(group.groupId))
                + " > "
                + group.text
        }
    }

    onCancel() {
        this.setState({modalShown: false});
    }

    onSelect(value) {
        this.setState({modalShown: false});
        this.props.onChangeValue(value);
    }
}

export default GroupSelectFormSection
