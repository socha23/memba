import React from 'react'
import {setIdToken} from './apiHelper'

class SignInRequired extends React.Component {
    state = {
        apiLoaded: false,
        signedIn: false
    };

    onSignInSuccess(googleUser) {
        const idToken = googleUser.getAuthResponse().id_token;
        setIdToken(idToken);
        this.setState({signedIn: true});
    }

    onSignInFailure(failure) {
        console.log(failure);
        this.setState({signedIn: false});
    }

    loadGoogleApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";

        script.onload = () => {
            this.setState({apiLoaded: true});
            gapi.signin2.render('signInButton', {
              'scope': 'profile',
              'width': 240,
              'height': 50,
              'longtitle': true,
              'theme': 'dark',
              'onsuccess': (s) => {this.onSignInSuccess(s)},
              'onfailure': (f) => {this.onSignInFailure(f)}
            });
        };
        document.body.appendChild(script);
    }

    componentDidMount() {
        this.loadGoogleApi();
    }

    render() {
        return this.state.signedIn ? this.props.children : <div>
            <div id="signInButton">
                Connecting to Google...
            </div>
        </div>;
    }
}

export default SignInRequired