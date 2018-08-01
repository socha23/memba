import React from 'react'
import FlexColumn from './FlexColumn'
import TitleWithBack from './TitleWithBack'
import BigButton from "./BigButton";

const AddTodo = () => <FlexColumn style={{minHeight: "100%"}}>
    <TitleWithBack to="/">
        New item
    </TitleWithBack>
    <div style={{
        flexGrow: 1,
        marginTop: 10

    }}>
        <TodoTextInput/>


    </div>
    <BigButton style={{backgroundColor: "green"}}>
        I member!
    </BigButton>
</FlexColumn>;

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


export default AddTodo