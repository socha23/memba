import profileLogic from './profileLogic'

// notification logic from https://github.com/web-push-libs/webpush-java/blob/master/doc/UsageExample.md

class NotificationsLogic {
    requestPermission() {
        navigator.serviceWorker.getRegistration().then(reg => {
            Notification.requestPermission(status => {
                if (status === 'granted') {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(global.VAPID_PUBLIC_KEY)
                    }).then(sub => {
                        console.log("Subscribing: ", JSON.stringify(sub));
                        this.registerSubscription(sub);
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

    registerSubscription(sub) {
        const key = sub.getKey ? sub.getKey('p256dh') : '';
        const auth = sub.getKey ? sub.getKey('auth') : '';
        const subscription = {
            endpoint: sub.endpoint,
            key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
            auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
        };
        profileLogic.registerPushSubscription(subscription);
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
    ;
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const NOTIFICATIONS_LOGIC = new NotificationsLogic();

export default NOTIFICATIONS_LOGIC;