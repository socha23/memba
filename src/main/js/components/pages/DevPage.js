import React from 'react'

import {BrandedNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import TimePicker from "../TimePicker";

class DevPage extends React.Component {

    render() {

        return <div>
            <button className={"btn btn-primary btn-block"} onClick={this.onUpdateServiceWorker}>Update service worker</button>
        </div>
    }

    onUpdateServiceWorker = v => {
        navigator.serviceWorker.ready.then( reg => {
            console.log(reg);
            reg.update();
            console.log("updated");

        });
    };
}


export default () => <div>
    <BrandedNavbar title="Dev playground"/>

    <PageBody>
        <div style={{padding: 10}}>
            <DevPage/>
        </div>
    </PageBody>
</div>;