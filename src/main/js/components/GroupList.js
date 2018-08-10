import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import GroupListItem from './GroupListItem'

export default ({groups}) => <ReactCSSTransitionGroup
        transitionName="todoItem"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
    >
        {groups.map(group => <GroupListItem key={group.id} group={group}/>)}
    </ReactCSSTransitionGroup>
