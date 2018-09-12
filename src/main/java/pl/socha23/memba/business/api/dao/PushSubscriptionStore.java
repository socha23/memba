package pl.socha23.memba.business.api.dao;

import java.util.Collection;

public interface PushSubscriptionStore {
    Collection<String> listPushSubscriptions(String userId);
    void addPushEndpoint(String id, String endpoint);
    void removePushEndpoints(String id, Collection<String> endpointsToRemove);
}
