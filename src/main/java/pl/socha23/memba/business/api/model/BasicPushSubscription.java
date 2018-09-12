package pl.socha23.memba.business.api.model;

import java.util.Objects;

public class BasicPushSubscription implements PushSubscription {

    private String endpoint;

    @Override
    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public static BasicPushSubscription copy(PushSubscription subscription) {
        var result = new BasicPushSubscription();
        result.setEndpoint(subscription.getEndpoint());
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o instanceof PushSubscription) {
            var that = (PushSubscription)o;
            return Objects.equals(endpoint, that.getEndpoint());
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(endpoint);
    }
}
