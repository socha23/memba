import React from 'react'
import {setIdToken} from '../apiHelper'
import BigMemba from './BigMemba'
import {BrandedNavbar} from './PageTopNavbar'
import {BorderlessBottomNavbar} from './PageBottomNavbar'
import PageBody from './PageBody'
import ButtonIcon from './ButtonIcon'

const NotYetSignedIn = ({children, onClickSignIn}) => <div>
    <BrandedNavbar/>
    <PageBody>
        <BigMemba/>
    </PageBody>
    <BorderlessBottomNavbar>
        <a id="signInButton" className="btn btn-block btn-success" onClick={onClickSignIn}>
            <ButtonIcon className="fab fa-google"/>
            Sign in with Google
        </a>
    </BorderlessBottomNavbar>
</div>;



class SignInRequired extends React.Component {
    state = {
        apiLoaded: false,
        signedIn: false
    };

    onSignInChange() {
        const user = this.auth2.currentUser.get();
        if (user.isSignedIn()) {
            const idToken = user.getAuthResponse().id_token;
            setIdToken(idToken);
            this.setState({signedIn: true});
        } else {
            this.setState({signedIn: false});
        }
    }

    loadGoogleApi() {
        global.gapi.load('auth2', () => {
            this.setState({apiLoaded: true});
            global.gapi.auth2.init({
                client_id: global.GOOGLE_CLIENT_ID,
                scope: "profile"
            }).then((auth2) => {
                this.auth2 = auth2;
                this.onSignInChange();
                auth2.isSignedIn.listen(() => {this.onSignInChange()});
            });
        });
    }

    componentDidMount() {
        this.loadGoogleApi();
    }

    onClickSignIn() {
        this.auth2.signIn();
    }

    render() {
        if (this.state.signedIn) {
            return this.props.children;
        } else {
            return <NotYetSignedIn onClickSignIn={() => this.onClickSignIn()}/>
        }
    }
}

export default SignInRequired