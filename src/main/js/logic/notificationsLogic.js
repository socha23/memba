import profileLogic from './profileLogic'

class NotificationsLogic {
    requestPermission() {
        navigator.serviceWorker.ready.then(function(reg) {
          Notification.requestPermission(function(status) {
              reg.pushManager.subscribe({
                      userVisibleOnly: true
                    }).then(function(sub) {
                      console.log('Endpoint URL: ', sub.endpoint);
                    }).catch(function(e) {
                      if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                      } else {
                        console.error('Unable to subscribe to push', e);
                      }
                    });
          });
        })
         .catch(function(err) {
              console.log('Service Worker registration failed: ', err);
        });
    }
}

const NOTIFICATIONS_LOGIC = new NotificationsLogic();

export default NOTIFICATIONS_LOGIC;