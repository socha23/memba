import React from 'react'

import notificationsLogic from '../../logic/notificationsLogic'

class RequestPushNotifications extends React.Component {

    componentDidMount() {
        notificationsLogic.requestPermission();
    }
    render() {
        return <div/>
    }
}

export default RequestPushNotifications