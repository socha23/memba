import React from 'react'
import moment from 'moment'
import {setIdToken} from '../../logic/apiHelper'
import BigMemba from '../BigMemba'
import {BrandedNavbar} from './PageTopNavbar'
import {BorderlessBottomNavbar, PageBottomNavbar} from './PageBottomNavbar'
import PageBody from './PageBody'
import ButtonIcon from '../ButtonIcon'


const TOKEN_VALID_CHECK_INTERVAL = 1 * 1000;
const RELOAD_WHEN_TOKEN_VALID_FOR_LESS_THEN_MS = 300 * 1000;
const BLOCK_WHEN_TOKEN_VALID_FOR_LESS_THEN_MS = 60 * 1000;


const NotYetSignedIn = ({children, googleApisLoaded, onClickSignIn}) => <div>
    <BrandedNavbar/>
    <PageBody>
        <BigMemba/>
    </PageBody>
    {googleApisLoaded ?
    <BorderlessBottomNavbar>
        <a id="signInButton" className="btn btn-block btn-primary" onClick={onClickSignIn}>
            <ButtonIcon className="fab fa-google"/>
            Sign in with Google
        </a>
    </BorderlessBottomNavbar>
        :  <PageBottomNavbar>Loading Google API...</PageBottomNavbar>
            }
</div>;



class SignInRequired extends React.Component {
    state = {
        apiLoaded: false,
        apiInitialized: false,
        signedIn: false,
        tokenExpiryOn: null,
        tokenValidForMs: 0
    };

    onSignInChange() {
        const user = this.auth2.currentUser.get();
        if (user.isSignedIn()) {
            this.onAuth(user.getAuthResponse());
        } else {
            this.setState({signedIn: false});
        }
    }

    onAuth(authResponse) {
        setIdToken(authResponse.id_token);
        this.setState({signedIn: true, tokenExpiryOn: moment().add(authResponse.expires_in, "seconds")});
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
                this.setState({apiInitialized: true});
                auth2.isSignedIn.listen(() => {this.onSignInChange()});
            });
        });
    }

    componentDidMount() {
        this.loadGoogleApi();
        setInterval(() => {this.authExpiredCheck()}, TOKEN_VALID_CHECK_INTERVAL)
    }

    authExpiredCheck() {
        if (this.auth2 && this.state.apiInitialized) {
            const tokenValidForMs = this.state.tokenExpiryOn.diff(moment());
            this.setState({tokenValidForMs: tokenValidForMs});
            if (tokenValidForMs < RELOAD_WHEN_TOKEN_VALID_FOR_LESS_THEN_MS) {
                this.auth2.currentUser.get().reloadAuthResponse().then(r => this.onAuth(r));
            }
        }
    }

    onClickSignIn() {
        this.auth2.signIn();
    }

    render() {
        if (this.state.signedIn && this.state.tokenValidForMs >= BLOCK_WHEN_TOKEN_VALID_FOR_LESS_THEN_MS) {
            return this.props.children;
        } else {
            return <NotYetSignedIn googleApisLoaded={this.state.apiLoaded} onClickSignIn={() => this.onClickSignIn()}/>
        }
    }
}

export default SignInRequired