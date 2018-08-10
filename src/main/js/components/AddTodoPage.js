import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractTodoFormPage from './AbstractItemFormPage'

import {DEFAULT_COLOR} from "./ColorPicker";

const AddTodoPage = ({location}) =>
    <AbstractTodoFormPage
        item={{
            text: '',
            color: DEFAULT_COLOR,
            groupId: location.query.groupId || todoLogic.ROOT_GROUP_ID,
        }}
        onSave={(item) => {
            setTimeout(() => {
                todoLogic.addItem(item);
            });
        }}
        saveButtonLabel="Add new item"
        createMode={true}
    />;

export default withRouterWithQuery(AddTodoPage)