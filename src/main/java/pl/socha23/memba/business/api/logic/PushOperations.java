package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.PushSubscription;

public interface PushOperations {
    void pushTo(String userId);
    void addPushSubscription(String userId, PushSubscription subscription);

}
