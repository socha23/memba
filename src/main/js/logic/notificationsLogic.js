import profileLogic from './profileLogic'

class NotificationsLogic {
    requestPermission() {
        navigator.serviceWorker.getRegistration().then(reg => {
            Notification.requestPermission(status => {
                if (status === 'granted') {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(sub => {
                        this.registerPushEndpoint(sub.endpoint);
                    }).catch(function (e) {
                        console.error('Unable to subscribe to push', e);
                    });
                } else {
                    console.warn('Permission for notifications was denied');
                }
            });
        })
            .catch(function (err) {
                console.log('Service Worker registration failed: ', err);
            });
    }

    registerPushEndpoint(endpoint) {
        profileLogic.registerPushEndpoint(endpoint);

        //

        console.log('Endpoint URLa: ', endpoint);
    }

}

const NOTIFICATIONS_LOGIC = new NotificationsLogic();

export default NOTIFICATIONS_LOGIC;