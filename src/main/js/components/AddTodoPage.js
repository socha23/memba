import React from 'react'
import {withRouter} from 'react-router-dom'

import todoLogic from '../todoLogic'
import AbstractEditTodoPageView from './AbstractEditTodoPageView'

import ButtonIcon from './ButtonIcon'

class AddTodoPage extends React.Component {

    state = {
        text: ''
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
            todo={this.state}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={true}
        />;
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    onSubmit() {
        setTimeout(() => {
            todoLogic.addTodo({
                text: this.state.text.trim()
            });
        });
        this.props.history.push('/');
    }
}


export default withRouter(AddTodoPage)