import React from 'react'

import {BrandedNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import DrumPicker from '../DrumPicker'

class DevPage extends React.Component {

    state = {
        value: "00"
    };

    render() {

        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(("0" + i).substr(-2, 2))
        }

        return <div style={{display: "flex", justifyContent: "space-between"}}>
            <DrumPicker values={hours} value={this.state.value} onChangeValue={this.onChangeValue}/>
            <div>
                <div>
                    <h1>{this.state.value}</h1>
                    <button className="btn btn-primary" onClick={() => {this.setState({value: "00"})}}>00</button>
                    <button className="btn btn-primary" onClick={() => {this.setState({value: "08"})}}>08</button>
                    <button className="btn btn-primary" onClick={() => {this.setState({value: "16"})}}>16</button>
                    <button className="btn btn-primary" onClick={() => {this.setState({value: "23"})}}>23</button>
                </div>
            </div>
        </div>;
    }

    onChangeValue = v => {
        console.log("set to " + v);
        this.setState({value: v});
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