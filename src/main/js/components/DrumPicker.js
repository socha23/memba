import React from 'react'
import PropTypes from 'prop-types'

const ANIMATION_FRAME_MS = 10;

const MOMENTUM_DECAY_PER_MS = 0.01;

const MAX_MOMENTUM = 0.2;

class DrumPicker extends React.Component {

    static propTypes = {
        values: PropTypes.array.isRequired,
        lineHeight: PropTypes.number,
        linesBeforeAndAfter: PropTypes.number,
    };

    static defaultProps = {
        lineHeight: 30,
        linesBeforeAndAfter: 2,
    };

    constructor(props) {
        super(props);
        this.state = {
            tumblerTop: 0,
        };

        this.lastPanPos = 0;
        this.lastPanTime = 0;
        this.tumblerTopBeforePan = 0;
        this.panStart = 0;
        this.panSpeed = 0; // px per ms

        this.animationHandle = null;
        this.lastAnimationTime = 0;
        this.momentum = 0;
    }

    render() {
        return <div style={{
            position: "relative",
            height: (this.props.linesBeforeAndAfter * 2 + 1) * this.props.lineHeight,
            width: 50,
            backgroundColor: "green",
            overflow: "hidden"
        }}>
            <div style={{
                position: "absolute",
                top: this.props.linesBeforeAndAfter * this.props.lineHeight,
                width: "100%",
                height: this.props.lineHeight,
                border: "2px solid white",
                borderRadius: 4
            }}/>
            <Tumbler
                elemRef={this.setupTumblerElem}
                values={this.props.values}
                lineHeight={this.props.lineHeight}
                style={{
                    top: this.state.tumblerTop
                }}
            />
        </div>
    }

    setupTumblerElem = e => {
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
        this.setState({
            tumblerTop: value
        });
        this.updateValue(value);
    };

    onPanEnd = e => {
        const dT = new Date().getTime() - this.lastPanTime;
        if (dT < 50) {
            this.setMomentum(this.panSpeed);
        } else {
            this.moveStopped();
        }

    };

    setMomentum = momentum => {
        if (momentum < -MAX_MOMENTUM) {
            momentum = -MAX_MOMENTUM;
        } else if (momentum > MAX_MOMENTUM) {
            momentum = MAX_MOMENTUM;
        }
        this.momentum = momentum;
        if (this.animationHandle == null) {
            this.animationHandle = setInterval(this.animate, ANIMATION_FRAME_MS);
            this.lastAnimationTime = new Date().getTime();
        }
    };

    animate = () => {
        const time = new Date().getTime();
        const dT = time - this.lastAnimationTime;
        if (dT > 0) {
            const dPos = this.momentum * dT;
            this.setTumblerTop(this.state.tumblerTop + dT * dPos);
            this.momentum = this.decayedMomentum(this.momentum, dT);
        }
        this.lastAnimationTime = time;

        if (this.momentum === 0) {
            this.stopMomentum();
            this.moveStopped();
        }
    };

    moveStopped = () => {
        
    };

    decayedMomentum = (v, t) => {
        return v * Math.pow(1 - MOMENTUM_DECAY_PER_MS, t);
    };

    stopMomentum = () => {
        if (this.animationHandle) {
            clearInterval(this.animationHandle);
            this.animationHandle = null;
        }
        this.momentum = 0;
    };

    updateValue = tumblerTop => {
    };

    tumblerTopToValueIdx = tumblerTop => {
        const val = -1 * (tumblerTop - this.props.linesBeforeAndAfter * this.props.lineHeight - this.props.lineHeight / 2);
        return Math.floor(val / this.props.lineHeight);
    }



}

const Tumbler = ({values, elemRef, style, lineHeight}) => <div
    ref={elemRef}
    style={{
        width: "100%",
        fontSize: 20,
        position: "absolute",
        ...style
    }}>
    {
        values.map(v => <div
            key={v}
            style={{
                cursor: "pointer",
                height: lineHeight,
            }}

        >{v}</div>)
    }
</div>;


export default DrumPicker