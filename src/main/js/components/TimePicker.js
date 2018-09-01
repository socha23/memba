import React from 'react'
import PropTypes from 'prop-types'

import DrumPicker from './DrumPicker'

const HOURS = [];
for (let i = 0; i < 24; i++) {
    HOURS.push(("0" + i).substr(-2, 2))
}

const MINUTES = [];
for (let i = 0; i < 60; i++) {
    MINUTES.push(("0" + i).substr(-2, 2))
}


const ROW_HEIGHT = 42;
const MARGIN_ROWS = 2;

const DRUM_WIDTH = 54;
const FONT_SIZE = 32;


class TimePicker extends React.Component {

    static propTypes = {
        value: PropTypes.string,
        onChangeValue: PropTypes.func,
    };

    static defaultProps = {
        onChangeValue: () => {
        },
        value: "00:00",
    };

    render() {

        return <div style={{position: "relative"}}>
            <div style={{
                position: "absolute",
                width: "100%",
                top: ROW_HEIGHT * MARGIN_ROWS + 1,
                height: ROW_HEIGHT,
                borderTop: "2px solid white",
                borderBottom: "2px solid white",
            }}>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <DrumPicker
                            width={DRUM_WIDTH}
                            rowHeight={ROW_HEIGHT}
                            values={HOURS} value={this.props.value.substr(0, 2)}
                            showMark={false} cycleValues={true}
                            onChangeValue={v => {this.props.onChangeValue(v + this.props.value.substr(2, 3))}}
                            itemStyle={{
                                fontSize: FONT_SIZE,
                                color: "white",
                                justifyContent: "flex-end",
                                paddingRight: 6,
                            }}
                />
                <div style={{
                    fontSize: FONT_SIZE,
                    position: "relative",
                    top: -2,
                }}>:</div>
                <DrumPicker
                            width={DRUM_WIDTH}
                            rowHeight={ROW_HEIGHT}
                            values={MINUTES} value={this.props.value.substr(3, 2)}
                            showMark={false} cycleValues={true}
                            onChangeValue={v => {this.props.onChangeValue(this.props.value.substr(0, 3) + v)}}
                            itemStyle={{
                                fontSize: 30,
                                color: "white",
                                justifyContent: "flex-start",
                                paddingLeft: 5,
                            }}

                />
            </div>
        </div>


    }
}

export default TimePicker