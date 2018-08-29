import React from 'react'
import PropTypes from 'prop-types'

const ANIMATION_FRAME_MS = 10;

const VELOCITY_DECAY_PER_MS_SQUARED = 0.002;

const MAX_VELOCITY = 2;
const DELTA_POS_CUTOFF = 0.1;

class DrumPicker extends React.Component {

    static propTypes = {
        values: PropTypes.array.isRequired,
        onChangeValue: PropTypes.func,
        rowHeight: PropTypes.number,
        rowsBeforeAndAfter: PropTypes.number,
        cycleValues: PropTypes.bool,
    };

    static defaultProps = {
        onChangeValue: () => {},
        rowHeight: 40,
        rowsBeforeAndAfter: 2,
        cycleValues: false,
    };

    constructor(props) {
        super(props);

        const valueIdx = props.value ? props.values.indexOf(props.value) : 0;
        this.state = {
            tumblerTop: this.valueIdxToTumblerTop(valueIdx),
        };


        this.lastPanPos = 0;
        this.lastPanTime = 0;
        this.tumblerTopBeforePan = 0;
        this.panStart = 0;
        this.panSpeed = 0; // px per ms

        this.animationHandle = null;
        this.lastAnimationTime = 0;
        this.velocity = 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value != prevProps.value) {
            this.moveToValue(this.props.value);
        }


    }
    

    render() {
        return <div style={{
            position: "relative",
            height: (this.props.rowsBeforeAndAfter * 2 + 1) * this.props.rowHeight,
            width: 60,
            overflow: "hidden",

        }}
                    ref={this.setupEvents}
        >
            <div className="drumPickerTopMask"
                style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: this.props.rowsBeforeAndAfter * this.props.rowHeight,
                zIndex: 2
            }}/>

            <div className="drumPickerBottomMask"
                style={{
                position: "absolute",
                top: (this.props.rowsBeforeAndAfter + 1) * this.props.rowHeight,
                width: "100%",
                height: this.props.rowsBeforeAndAfter * this.props.rowHeight,
                zIndex: 2
            }}/>
            <div style={{
                position: "absolute",
                top: this.props.rowsBeforeAndAfter * this.props.rowHeight,
                width: "100%",
                height: this.props.rowHeight,
                borderTop: "2px solid white",
                borderBottom: "2px solid white",
            }}/>
            <Tumbler
                values={this.props.values}
                lineHeight={this.props.rowHeight}
                cycleValues={this.props.cycleValues}
                style={{
                    top: this.state.tumblerTop
                }}
            />
        </div>
    }

    setupEvents = e => {
        $(e).hammer({})
            .bind("panstart", this.onPanStart)
            .bind("panmove", this.onPanMove)
            .bind("panend", this.onPanEnd)
        ;
        $(e).data("hammer").get("pan").set({direction: Hammer.DIRECTION_VERTICAL, threshold: 0});
    };

    onPanStart = e => {
        this.panStart = e.gesture.center.y;
        this.tumblerTopBeforePan = this.state.tumblerTop;
    };

    onPanMove = e => {
        const currentPanPos = e.gesture.center.y;
        const currentTime = new Date().getTime();

        this.setTumblerTop(this.tumblerTopBeforePan - this.panStart + currentPanPos);

        if (this.lastPanTime) {
            const dT = currentTime - this.lastPanTime;
            this.panSpeed = (currentPanPos - this.lastPanPos) / (dT);
        }
        
        this.lastPanPos = currentPanPos;
        this.lastPanTime = currentTime;
    };

    setTumblerTop = value => {

        if (!this.props.cycleValues) {
            value = Math.min(value, this.props.rowsBeforeAndAfter * this.props.rowHeight);
            value = Math.max(value, -1 * (this.props.values.length - this.props.rowsBeforeAndAfter - 1)* this.props.rowHeight);
        } else {

            const z = this.props.values.length * this.props.rowHeight;
            const trashingMargin = 3 * this.props.rowHeight;
            if (value > -z + trashingMargin) {
                value -= z;
            } else if (value < -2 * z + trashingMargin) {
                value += z;
            }
        }
        
        this.setState({
            tumblerTop: value
        });
    };



    onPanEnd = () => {
        let velocity = this.panSpeed;
        if (velocity < -MAX_VELOCITY) {
            velocity = -MAX_VELOCITY;
        } else if (velocity > MAX_VELOCITY) {
            velocity = MAX_VELOCITY;
        }
        this.setVelocity(velocity);
    };

    setVelocity = velocity => {
        this.velocity = velocity;
        if (this.animationHandle == null) {
            this.animationHandle = setInterval(this.animate, ANIMATION_FRAME_MS);
            this.lastAnimationTime = new Date().getTime();
        }
    };

    animate = () => {
        const time = new Date().getTime();
        const dT = time - this.lastAnimationTime;
        if (dT > 0) {
            const sign = this.velocity >= 0 ? 1 : -1;
            const absVel = Math.abs(this.velocity);

            const absDeltaPos = absVel * dT - (VELOCITY_DECAY_PER_MS_SQUARED * dT * dT) / 2;

            if (absDeltaPos > DELTA_POS_CUTOFF) {
                this.setTumblerTop(this.state.tumblerTop + absDeltaPos * sign);
                this.velocity = sign * (Math.max(0, absVel - dT * VELOCITY_DECAY_PER_MS_SQUARED))
            } else {
                this.velocity = 0;
            }

        }
        this.lastAnimationTime = time;

        if (this.velocity === 0) {
            this.moveStopped();
        }
    };


    moveStopped = () => {
        if (this.correctionNeeded()) {
            this.applyCorrection();
        } else {
            this.stopAnimation();
            const currentVal = this.props.values[this.tumblerTopToValueIdx(this.state.tumblerTop)];
            if (currentVal !== this.props.value) {
                this.props.onChangeValue(currentVal);
            }
        }
    };

    correctionNeeded = () => {
        return Math.abs(this.state.tumblerTop - this.correctedTumblerTopPx()) > DELTA_POS_CUTOFF;
    };

    correctedTumblerTopPx = () => {
        const pos = this.state.tumblerTop;
        let proposedPos = this.valueIdxToTumblerTop(this.currentTumblerIdx());

        const z = this.props.values.length * this.props.rowHeight;
        console.log("z", z);
        let delta = proposedPos - pos;

        if (Math.abs(delta) > (delta + z)) {
            console.log("delta reduction");
            delta += z
        }

        console.log("correcting", pos, "to", pos + delta, "delta", delta);
        return pos + delta;

    };

    currentTumblerIdx = () => {
        return this.tumblerTopToValueIdx(this.state.tumblerTop);
    };

    applyCorrection = () => {
        console.log("applying correction from ", this.state.tumblerTop, "to", this.correctedTumblerTopPx());
        this.moveToPx(this.correctedTumblerTopPx());
        //this.moveToIdx(this.currentTumblerIdx());
    };

    moveToValue = (value) => {
        const idx = this.props.values.indexOf(value);
        this.moveToIdx(idx);
    };

    moveToIdx = (idx) => {
        const additionalRows = this.props.cycleValues ? this.props.values.length : 0;
        const pxPos = (this.props.rowsBeforeAndAfter - additionalRows - idx) * this.props.rowHeight;
        this.moveToPx(pxPos)
    };

    moveToPx = (pxPos) => {
        const deltaS = pxPos - this.state.tumblerTop;
        const sign = deltaS >= 0 ? 1 : -1;

        const absV =  Math.sqrt(2 * VELOCITY_DECAY_PER_MS_SQUARED * Math.abs(deltaS));
        this.setVelocity(sign * absV);
    };

    stopAnimation = () => {
        if (this.animationHandle) {
            clearInterval(this.animationHandle);
            this.animationHandle = null;
        }
    };

    tumblerTopToValueIdx = tumblerTop => {
        const additionalRows = this.props.cycleValues ? this.props.values.length : 0;
        tumblerTop += additionalRows * this.props.rowHeight;
        const val = -1 * (tumblerTop - this.props.rowsBeforeAndAfter * this.props.rowHeight - this.props.rowHeight / 2);

        const result = Math.floor(val / this.props.rowHeight);
        return (result + this.props.values.length) % this.props.values.length;

    };

    valueIdxToTumblerTop = valueIdx => {
        const additionalRows = this.props.cycleValues ? this.props.values.length : 0;
        const result = (this.props.rowsBeforeAndAfter - additionalRows - valueIdx) * this.props.rowHeight;
        return result;

    };



}

const Tumbler = ({values, elemRef, style, lineHeight, cycleValues}) => {
    let rows = [];
    if (cycleValues) {
        rows = rows.concat(values.map(v => ({key: "bef-" + v, value: v})))
    }
    rows = rows.concat(values.map(v => ({key: v, value: v})));
    if (cycleValues) {
        rows = rows.concat(values.map(v => ({key: "aft-" + v, value: v})))
    }


    return <div
        ref={elemRef}
        style={{
            width: "100%",
            fontSize: 30,
            position: "absolute",
            ...style
        }}>
        {
            rows.map(v => <div
                key={v.key}
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer",
                    height: lineHeight,
                }}

            >{v.value}</div>)
        }
    </div>
};


export default DrumPicker