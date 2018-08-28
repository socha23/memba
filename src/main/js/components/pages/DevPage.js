import React from 'react'

import {BrandedNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import DrumPicker from '../DrumPicker'

class DevPage extends React.Component {
    render() {

        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(("0" + i).substr(-2, 2))
        }

        return <div style={{display: "flex", justifyContent: "space-between"}}>
            <DrumPicker values={hours}/>
            <span>XXX</span>
        </div>;
    }
}


export default () => <div>
    <BrandedNavbar title="Dev playground"/>

    <PageBody>
        <div style={{padding: 10}}>
            <DevPage/>
        </div>
    </PageBody>
</div>;