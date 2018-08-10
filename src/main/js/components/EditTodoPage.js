import React from 'react'
import {withRouterWithQuery, encodeQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractEditItemPageView from './AbstractEditItemPageView'

import ButtonIcon from './ButtonIcon'

class EditTodoPage extends React.Component {

    state = {
        ...todoLogic.findTodoById(this.props.match.params.todoId)
    };

    render() {
        return <AbstractEditItemPageView
            title="Edit todo"
            buttonClass={this.isSubmitEnabled() ? "btn-success" : "btn-primary"}
            buttonContents={this.isSubmitEnabled() ? <span>
                                <ButtonIcon className={"fas fa-check"}/>
                                Save changes
                            </span>
                            : "Enter description first"}
            item={this.getTodo()}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={false}
        />;
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    getTodo() {
        return {...this.state, groupId: this.getGroupId()}
    }

    onSubmit() {
        todoLogic.update(this.props.match.params.todoId, this.getTodo());
        this.props.history.push(encodeQuery("/", {groupId: this.getGroupId()}));
    }

    getGroupId() {
        return this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID
    }

}


export default withRouterWithQuery(EditTodoPage)