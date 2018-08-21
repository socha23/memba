import React from 'react'
import ReactDOM from 'react-dom'

export class WithBottomBar extends React.Component {

    static statusDiv = null;
    static navDiv = null;
    static toastDiv = null;

    state = {
        divsReady: false
    };

    checkIfDivsReady() {
        if (
            WithBottomBar.statusDiv != null
            && WithBottomBar.navDiv != null
            && WithBottomBar.toastDiv != null
            && !this.state.divsReady) {
            this.setState({divsReady: true});
        }
    }

    render() {
        return <div>
            {this.state.divsReady ? this.props.children : <span/>}
            <div className="fixed-bottom">
                <div ref={e => {WithBottomBar.toastDiv = e; setTimeout(() => {this.checkIfDivsReady()})}}/>
                <div ref={e => {WithBottomBar.statusDiv = e; setTimeout(() => {this.checkIfDivsReady()})}}/>
                <div ref={e => {WithBottomBar.navDiv = e; setTimeout(() => {this.checkIfDivsReady()})}}/>
            </div>
        </div>;
    }

    static renderBottomNavbar(elem) {
        return ReactDOM.createPortal(elem, WithBottomBar.navDiv);
    }

    static renderStatus(elem) {
        return ReactDOM.createPortal(elem, WithBottomBar.statusDiv);
    }

}

export const StatusBar = ({children}) => WithBottomBar.renderStatus(
    <div className="container" style={{padding: 2, paddingBottom: 0}}>
        {children}
    </div>);

export const BottomButtonBar = ({children}) => WithBottomBar.renderBottomNavbar(
    <nav
        className="navbar navbar-expand-lg"
        style={{padding: 0, paddingTop: 1, border: "none", backgroundColor: "#272B30"}}
    >
        <div className="container">
            {children}
        </div>
    </nav>
);
