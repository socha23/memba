package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.PushSubscription;

interface PushNotificationSender {

    class PushResult {
        enum Status {SUCCESS, ENDPOINT_NOT_REGISTRED, ERROR};

        private final PushSubscription subscription;
        private final Status status;

        public PushResult(PushSubscription subscription, Status status) {
            this.subscription = subscription;
            this.status = status;
        }

        public PushSubscription getSubscription() {
            return subscription;
        }

        public Status getStatus() {
            return status;
        }
    }

    PushResult sendPushNotification(PushSubscription subscription);
}
