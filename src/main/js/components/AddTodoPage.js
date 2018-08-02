import React from 'react'
import {Link} from 'react-router-dom'

import {BrandedNavbar} from './PageTopNavbar'
import PageBody from './PageBody'

const AddTodoPage = () => <div>
    <BrandedNavbar title="Enter details">
        <Link to="/" className="btn btn-primary">
            Back
        </Link>
    </BrandedNavbar>
    
    <PageBody>
        <div className="container" style={{padding: 2}}>
            <TodoTextInput/>
            <Link to="/" className="btn btn-primary btn-lg btn-block">
                Add new item
            </Link>
        </div>
    </PageBody>
</div>;

class TodoTextInput extends React.Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <div className="form-group">
            <label for="description" className="col-form-label-lg">Description:</label>
            <textarea id="description" rows={4} ref={r => {this.input = r}} type="text" className="form-control form-control-lg" style={{paddingTop: 3, paddingRight: 5, paddingBottom: 3, paddingLeft: 5}}/>
        </div>
    }
}


export default AddTodoPage