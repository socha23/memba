import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'

import {DEFAULT_COLOR} from "./ColorPicker";

class AddItemPage extends AbstractItemFormPage {

    getInitialItem() {
        return {
                text: '',
                color: DEFAULT_COLOR,
                groupId: this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID,
            }
    }

    getSaveButtonLabel() {
        return "Add new item"
    }

    isCreateMode() {
        return true;
    }

    save() {
        setTimeout(() => {
            todoLogic.addItem(this.getItem());
        });
    }
}


export default withRouterWithQuery(AddItemPage)