import React from 'react'
import {withRouterWithQuery, encodeQuery} from '../routerUtils'

import todoLogic from '../todoLogic'
import AbstractEditTodoPageView from './AbstractEditTodoPageView'

import ButtonIcon from './ButtonIcon'
import {DEFAULT_COLOR} from "./ColorPicker";

class AddTodoPage extends React.Component {

    state = {
        text: '',
        color: DEFAULT_COLOR
    };

    render() {
        return <AbstractEditTodoPageView
            title="Enter details"
            buttonClass={this.isSubmitEnabled() ? "btn-success" : "btn-primary"}
            buttonContents={this.isSubmitEnabled() ? <span>
                                <ButtonIcon className={"fas fa-check"}/>
                                Add new item
                            </span>
                            : "Enter description first"}
            todo={this.getTodo()}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={true}
        />;
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    getTodo() {
        return {...this.state, groupId: this.getGroupId()}
    }

    onSubmit() {
        setTimeout(() => {
            todoLogic.addTodo(this.getTodo());
        });
        this.props.history.push(encodeQuery("/", {groupId: this.getGroupId()}));
    }

    getGroupId() {
        return this.props.location.query.groupId || todoLogic.ROOT_GROUP_ID
    }
}


export default withRouterWithQuery(AddTodoPage)