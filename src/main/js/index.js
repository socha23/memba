import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'

class Hello extends React.Component {
    state = {
        message: "init"
    };

    componentDidMount() {
        this.setState({
            message: "didMount"
        });

        fetch("currentUser", {
            credentials: 'same-origin'
        })
            .then(r => r.json())
            .then(user => {this.setState({message: "Hello, " + user.firstName + "!"})})

    }

    render() {
        return <div>{this.state.message}</div>;
    }
}


ReactDOM.render(
    <Hello/>
, document.getElementById('result'));

