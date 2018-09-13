package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.PushSubscription;

public interface PushNotificationSender {

    public class PushResult {
        public enum Status {SUCCESS, ENDPOINT_NOT_REGISTRED, ERROR};

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

        public static PushResult success(PushSubscription subscription) {
            return new PushResult(subscription, Status.SUCCESS);
        }

        public static PushResult endpointNotRegistered(PushSubscription subscription) {
            return new PushResult(subscription, Status.ENDPOINT_NOT_REGISTRED);
        }

        public static PushResult error(PushSubscription subscription) {
            return new PushResult(subscription, Status.ERROR);
        }



        public boolean isSuccess() {
            return status == Status.SUCCESS;
        }
    }

    PushResult sendPushNotification(PushSubscription subscription, Object payload);

    default PushResult sendPushNotification(PushSubscription subscription) {
        return sendPushNotification(subscription, null);
    }

}
