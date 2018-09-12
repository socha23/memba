package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.PushSubscription;

import java.util.Collection;

public interface PushSubscriptionStore {
    Collection<? extends PushSubscription> listPushSubscriptions(String userId);
    void addPushSubscription(String id, PushSubscription subscription);
    void removePushSubscriptions(String id, Collection<PushSubscription> subscriptionsToRemove);
}
