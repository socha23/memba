import React from 'react'

import {BrandedNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import DrumPicker from '../DrumPicker'

class DevPage extends React.Component {

    state = {
        value: "00",
        value2: "00"
    };

    render() {

        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(("0" + i).substr(-2, 2))
        }

        const minutes = [];
        for (let i = 0; i < 60; i++) {
            minutes.push(("0" + i).substr(-2, 2))
        }

        return <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex"}}>
                <DrumPicker values={hours} value={this.state.value} onChangeValue={this.onChangeValue} cycleValues={true}/>
                <DrumPicker values={minutes} value={this.state.value2} onChangeValue={this.onChangeValue2} cycleValues={true}/>
            </div>
            <div>
                <div>
                    <h1>{this.state.value}:{this.state.value2}</h1>

                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "00", value2: "15"})}}>00:15</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "08", value2: "50"})}}>08:50</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "16", value2: "00"})}}>16:00</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "23", value2: "30"})}}>23:30</button>
                </div>
            </div>
        </div>;
    }

    onChangeValue = v => {
        this.setState({value: v});
    };

    onChangeValue2 = v => {
        this.setState({value2: v});
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