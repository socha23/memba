package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.logic.PushOperations;

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
    public void pushTo(String userId) {
         var subscriptions = pushSubscriptionsStore.listPushSubscriptions(userId);
         var subscriptionsToRemove = new HashSet<String>();
         for (var subscription : subscriptions) {
             var result = pushToEndpoint(subscription);
             if (result.getStatus() == PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED) {
                 subscriptionsToRemove.add(subscription);
             }
         }
         removeSubscriptions(userId, subscriptionsToRemove);
    }

    @Override
    public void addPushEndpoint(String userId, String endpoint) {
        pushSubscriptionsStore.addPushEndpoint(userId, endpoint);
    }

    private void removeSubscriptions(String userId, Collection<String> subscriptionsToRemove) {
        pushSubscriptionsStore.removePushEndpoints(userId, subscriptionsToRemove);
    }

    private PushNotificationSender.PushResult pushToEndpoint(String endpoint) {
        return pushNotificationSender.sendPushNotification(endpoint);
    }

}
