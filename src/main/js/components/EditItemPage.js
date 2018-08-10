import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'

class EditItemPage extends AbstractItemFormPage {

    getInitialItem() {
        return todoLogic.findTodoById(this.props.match.params.itemId);
    }

    getTitle() {
        return "Edit todo"
    }

    isCreateMode() {
        return false;
    }

    save() {
        todoLogic.update(this.getItem().id, this.getItem());
    }
}

export default withRouterWithQuery(EditItemPage)