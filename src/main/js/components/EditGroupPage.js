import React from 'react'
import {withRouterWithQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractItemFormPage from './AbstractItemFormPage'
import GroupForm from './GroupForm'


const EditGroupPage = ({match}) =>
    <AbstractItemFormPage
        formComponent={GroupForm}
        item={todoLogic.findGroupById(match.params.groupId)}
        onSave={(i) => {todoLogic.updateGroup(i.id, i)}}
        title="Edit group"
        createMode={false}
    />;

export default withRouterWithQuery(EditGroupPage)