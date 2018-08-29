import React from 'react'

import {BrandedNavbar} from '../structural/PageTopNavbar'
import PageBody from '../structural/PageBody'
import TimePicker from "../TimePicker";

class DevPage extends React.Component {

    state = {
        value: "00:00",
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
                <TimePicker value={this.state.value} onChangeValue={this.onChangeValue}/>
            </div>
            <div>
                <div>
                    <h1>{this.state.value}</h1>

                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "00:15"})}}>00:15</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "08:50"})}}>08:50</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "16:00"})}}>16:00</button>
                    <button className="btn btn-primary btn-block" onClick={() => {this.setState({value: "23:30"})}}>23:30</button>
                </div>
            </div>
        </div>;
    }

    onChangeValue = v => {
        this.setState({value: v});
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