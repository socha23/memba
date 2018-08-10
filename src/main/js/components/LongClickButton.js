import React from 'react'
import PropTypes from 'prop-types'

const LONG_PRESS_MS = 700;

class LongClickButton extends React.Component {

    state = {
        pressed: false,
        lastDown: 0
    };

    static propTypes = {
        onClick: PropTypes.func,
        onLongClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
        onLongClick: () => {},
    };

    onPressStarted() {
        if (this.state.pressed) {
            return;
        }
        this.setState({pressed: true, lastDown: Date.now()})
        this.timeout = setTimeout(() => {this.onPressStopped()}, LONG_PRESS_MS);
    }

    onPressStopped() {
        if (!this.state.pressed) {
            return;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        const time = Date.now() - this.state.lastDown;
        this.setState({pressed: false, lastDown: 0})
        if (time < LONG_PRESS_MS) {
            this.props.onClick();
        } else {
            this.props.onLongClick();
        }
    }

    render() {
        const buttonProps = {...this.props}
        delete buttonProps.onLongClick;

        return <button {...buttonProps}
                        onClick={() => {}}
                        onTouchStart={() => {this.onPressStarted()}}
                        onTouchEnd={() => {this.onPressStopped()}}
                        onMouseDown={() => {this.onPressStarted()}}
                        onMouseUp={() => {this.onPressStopped()}}
                        onMouseOut={() => {this.onPressStopped()}}>{this.props.children}</button>
    }
}


export default LongClickButton
        


