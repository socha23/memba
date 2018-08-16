import React from 'react'
import {withRouterWithQuery} from '../../routerUtils'

import todoLogic from '../../logic/todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import GroupForm from '../GroupForm'

import {COLORS} from "../ColorPicker";
import {randomFrom} from "../../utils";

import {currentUserId} from "../../currentUser";

const AddGroupPage = ({location}) =>
    <AbstractItemFormPage
        formComponent={GroupForm}
        item={{
            text: '',
            color: randomFrom(COLORS),
            groupId: location.query.groupId || todoLogic.ROOT_GROUP_ID,
            ownerIds: [currentUserId()],
        }}
        onSave={(item) => {
            setTimeout(() => {
                todoLogic.addGroup(item);
            });
        }}
        title="New list"
        saveButtonLabel="Add new list"
        createMode={true}
    />;

export default withRouterWithQuery(AddGroupPage)