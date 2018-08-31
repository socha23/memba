import React from 'react'
import {encodeQuery, withRouterWithQuery} from '../../routerUtils'

import {message} from '../../toast'
import todoLogic from '../../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import GroupForm from '../GroupForm'
import DeleteToolbarButton from "../DeleteToolbarButton";


const EditGroupPage = ({history, match}) => {
    const item = todoLogic.findGroupById(match.params.groupId);
    if (item == null) {
        history.push("/");
        return <span/>;
    }

    const deleteButton = <DeleteToolbarButton
                item={item}
                onDelete={() => {todoLogic.deleteGroup(item.id).then(() => message("List deleted"))}}
                buttonTitle="Delete list"
                message="Are you sure you want to delete this list? Its members will be moved up."
            />;
    return <AbstractItemFormPage
        formComponent={GroupForm}
        item={item}
        onSave={(i) => {
            todoLogic
                .updateGroup(i.id, i)
                .then((i) => {
                    history.push(encodeQuery("/", {groupId: i.id}));
                    message("Changes saved");
                })}}
        onBack={() => {
            history.push(encodeQuery("/", {groupId: item.id}));
        }}
        title="Edit list"
        createMode={false}
        groupNavbar={true}
        toolbarButtons={deleteButton}
    />
};

export default withRouterWithQuery(EditGroupPage)