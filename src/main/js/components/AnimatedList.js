import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default ({children}) => <ReactCSSTransitionGroup
        transitionName="todoItem"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
    >
        {children}
    </ReactCSSTransitionGroup>
