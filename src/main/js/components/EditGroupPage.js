import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import GroupForm from './GroupForm'
import DeleteToolbarButton from "./DeleteToolbarButton";


const EditGroupPage = ({match}) => {
    const item = todoLogic.findGroupById(match.params.groupId);
    const deleteButton = <DeleteToolbarButton
                item={item}
                onDelete={() => todoLogic.deleteGroup(item.id)}
                buttonTitle="Delete group"
                message="Are you sure you want to delete this group? Its members will be moved up."
            />;
    return <AbstractItemFormPage
        formComponent={GroupForm}
        item={item}
        onSave={(i) => {todoLogic.updateGroup(i.id, i)}}
        title="Edit group"
        createMode={false}
        toolbarButtons={deleteButton}
    />};

export default withRouterWithQuery(EditGroupPage)