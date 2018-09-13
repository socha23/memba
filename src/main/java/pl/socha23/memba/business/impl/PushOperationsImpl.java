package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.api.model.PushSubscription;

import java.util.Collection;
import java.util.HashSet;

@Component
public class PushOperationsImpl implements PushOperations {

    private PushSubscriptionStore pushSubscriptionsStore;
    private PushNotificationSender pushNotificationSender;

    public PushOperationsImpl(PushSubscriptionStore pushSubscriptionsStore, PushNotificationSender pushNotificationSender) {
        this.pushSubscriptionsStore = pushSubscriptionsStore;
        this.pushNotificationSender = pushNotificationSender;
    }

    @Override
    public void pushTo(String userId, Object payload) {
         var subscriptions = pushSubscriptionsStore.listPushSubscriptions(userId);
         var subscriptionsToRemove = new HashSet<PushSubscription>();
         for (var subscription : subscriptions) {
             var result = pushToEndpoint(subscription, payload);
             if (result.getStatus() == PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED) {
                 subscriptionsToRemove.add(subscription);
             }
         }
         removeSubscriptions(userId, subscriptionsToRemove);
    }

    @Override
    public void addPushSubscription(String userId, PushSubscription endpoint) {
        pushSubscriptionsStore.addPushSubscription(userId, endpoint);
    }

    private void removeSubscriptions(String userId, Collection<PushSubscription> subscriptionsToRemove) {
        pushSubscriptionsStore.removePushSubscriptions(userId, subscriptionsToRemove);
    }

    private PushNotificationSender.PushResult pushToEndpoint(PushSubscription endpoint, Object payload) {
        return pushNotificationSender.sendPushNotification(endpoint, payload);
    }

}
