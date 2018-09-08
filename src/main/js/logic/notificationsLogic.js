import profileLogic from './profileLogic'

class NotificationsLogic {
    requestPermission() {
        navigator.serviceWorker.getRegistration().then(reg => {
            Notification.requestPermission(status => {
                if (status === 'granted') {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(sub => {
                        console.log("endpoint", sub.endpoint);
                        this.registerPushEndpoint(sub.endpoint);
                    }).catch(function (e) {
                        console.error('Unable to subscribe to push', e);
                        reg.pushManager.getSubscription().then(s => s.unsubscribe());
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
    }

}

const NOTIFICATIONS_LOGIC = new NotificationsLogic();

export default NOTIFICATIONS_LOGIC;