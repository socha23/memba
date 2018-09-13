package pl.socha23.memba.business.api.model;

import java.util.Objects;

public class BasicPushSubscription implements PushSubscription {

    private String endpoint;
    private String key;
    private String auth;

    @Override
    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    @Override
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public static BasicPushSubscription copy(PushSubscription subscription) {
        var result = new BasicPushSubscription();
        result.setEndpoint(subscription.getEndpoint());
        result.setKey(subscription.getKey());
        result.setAuth(subscription.getAuth());
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o instanceof PushSubscription) {
            var that = (PushSubscription)o;
            return Objects.equals(endpoint, that.getEndpoint())
                    && Objects.equals(key, that.getKey())
                    && Objects.equals(auth, that.getAuth())
                    ;
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(endpoint, key, auth);
    }
}
