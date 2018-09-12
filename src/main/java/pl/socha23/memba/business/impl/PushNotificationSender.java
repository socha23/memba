package pl.socha23.memba.business.impl;

interface PushNotificationSender {

    class PushResult {
        enum Status {SUCCESS, ENDPOINT_NOT_REGISTRED, ERROR};

        private final String endpoint;
        private final Status status;

        public PushResult(String endpoint, Status status) {
            this.endpoint = endpoint;
            this.status = status;
        }

        public String getEndpoint() {
            return endpoint;
        }

        public Status getStatus() {
            return status;
        }
    }

    PushResult sendPushNotification(String endpoint);
}
