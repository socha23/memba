import React from 'react'
import {Link} from 'react-router-dom'

import PageTopNavbar from './PageTopNavbar'
import PageBody from './PageBody'

const AddTodoPage = () => <div>
    <PageTopNavbar>
        <Link to="/" className="btn btn-primary">
            Back
        </Link>

    </PageTopNavbar>
    <PageBody>
        <TodoTextInput/>
        <Link to="/" className="btn btn-primary btn-lg btn-block">
            Add new item
        </Link>
    </PageBody>
</div>;

class TodoTextInput extends React.Component {

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <div className="form-group">
                <textarea rows={4} ref={r => {this.input = r}} type="text" className="form-control form-control-lg"/>
        </div>
    }
}


export default AddTodoPage