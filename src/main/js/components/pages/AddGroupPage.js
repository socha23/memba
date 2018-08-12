import React from 'react'
import {withRouterWithQuery} from '../../routerUtils'

import todoLogic from '../../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import GroupForm from '../GroupForm'

import {DEFAULT_COLOR} from "../ColorPicker";

const AddGroupPage = ({location}) =>
    <AbstractItemFormPage
        formComponent={GroupForm}
        item={{
            text: '',
            color: DEFAULT_COLOR,
            groupId: location.query.groupId || todoLogic.ROOT_GROUP_ID,
        }}
        onSave={(item) => {
            setTimeout(() => {
                todoLogic.addGroup(item);
            });
        }}
        title="New group"
        saveButtonLabel="Add new group"
        createMode={true}
    />;

export default withRouterWithQuery(AddGroupPage)