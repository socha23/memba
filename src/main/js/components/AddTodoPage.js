import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import todoLogic from '../todoLogic'

import {PageTopNavbar, PageTitle} from "./PageTopNavbar";

import PageBody from './PageBody'
import {BorderlessBottomNavbar} from './PageBottomNavbar'
import ButtonIcon from './ButtonIcon'

const AddTodoPageView = ({
                             text, onChangeText,
                             submitEnabled, onSubmit
                         }) => <div>
    <PageTopNavbar>
        <div style={{display: "flex", alignItems: "center"}}>
            <Link to="/" className="btn btn-primary">
                <ButtonIcon className={"fas fa-backward"}/>Back
            </Link>
            <PageTitle>Enter details</PageTitle>
        </div>

    </PageTopNavbar>

    <PageBody>
        <div className="container" style={{padding: 2}}>
            <TodoTextInput value={text} onChangeValue={onChangeText}/>
        </div>
    </PageBody>

    <BorderlessBottomNavbar>
        <button
            className={"btn btn-lg btn-block " + (submitEnabled ? "btn-success" : "btn-primary")}
            disabled={!submitEnabled}
            onClick={submitEnabled ? onSubmit : () => {}}
        >
            {submitEnabled ? <span>
                    <ButtonIcon className={"fas fa-check"}/>
                    Add new item
                </span>
                : "Enter description first"}
        </button>
    </BorderlessBottomNavbar>


</div>;

class TodoTextInput extends React.Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <div className="form-group">
            <textarea id="description"
                      ref={r => {this.input = r}}
                      rows={5}
                      className="form-control form-control-lg"
                      style={{paddingTop: 3, paddingRight: 5, paddingBottom: 3, paddingLeft: 5}}
                      value={this.props.value}
                      onChange={(e) => {this.props.onChangeValue(e.target.value)}}

                      placeholder="Description..."

            />
        </div>
    }
}

class AddTodoPage extends React.Component {

    state = {
        text: ""
    };

    render() {
        return <AddTodoPageView
            text={this.state.text}
            onChangeText={(text) => {this.onChangeText(text)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
        />
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    onChangeText(text) {
        this.setState({text: text})
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