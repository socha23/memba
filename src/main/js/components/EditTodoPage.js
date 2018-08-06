import React from 'react'
import {withRouter} from 'react-router-dom'

import todoLogic from '../todoLogic'
import AbstractEditTodoPageView from './AbstractEditTodoPageView'

import ButtonIcon from './ButtonIcon'

class EditTodoPage extends React.Component {

    state = {
        ...todoLogic.findTodoById(this.props.match.params.todoId)
    };

    render() {
        return <AbstractEditTodoPageView
            title="Edit todo"
            buttonClass={this.isSubmitEnabled() ? "btn-success" : "btn-primary"}
            buttonContents={this.isSubmitEnabled() ? <span>
                                <ButtonIcon className={"fas fa-check"}/>
                                Save changes
                            </span>
                            : "Enter description first"}
            todo={this.state}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={false}
        />;
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    onSubmit() {
        todoLogic.update(this.props.match.params.todoId, this.state);
        this.props.history.push('/');
    }
}


export default withRouter(EditTodoPage)