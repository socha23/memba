import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import todoLogic from '../todoLogic'

import {BrandedNavbar} from './PageTopNavbar'
import PageBody from './PageBody'

const AddTodoPageView = ({
                             text, onChangeText,
                             submitEnabled, onSubmit
                         }) => <div>
    <BrandedNavbar title="Enter details">
        <Link to="/" className="btn btn-primary">
            Back
        </Link>
    </BrandedNavbar>

    <PageBody>
        <div className="container" style={{padding: 2}}>
            <TodoTextInput value={text} onChangeValue={onChangeText}/>
            <button className="btn btn-primary btn-lg btn-block" disabled={!submitEnabled} onClick={submitEnabled ? onSubmit : () => {}}>
                {submitEnabled ? "Add new item" : "Enter description first"}
            </button>
        </div>
    </PageBody>
</div>;

class TodoTextInput extends React.Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <div className="form-group">
            <label htmlFor="description" className="col-form-label-lg">Description:</label>
            <textarea id="description"
                      ref={r => {this.input = r}}
                      rows={4}
                      className="form-control form-control-lg"
                      style={{paddingTop: 3, paddingRight: 5, paddingBottom: 3, paddingLeft: 5}}

                      value={this.props.value}
                      onChange={(e) => {this.props.onChangeValue(e.target.value)}}

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
        todoLogic.addTodo({
            text: this.state.text.trim()
        });
        this.props.history.push('/');
    }
}


export default withRouter(AddTodoPage)