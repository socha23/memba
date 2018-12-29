package pl.socha23.memba.business.api.logic;

import java.time.Instant;

/**
 *
 */
public interface NotificationOperations {
    void sendNotificationForTodo(String todoId);

    /**
     * Sends unsent notifications and marks them as sent
     */
    void sendNotifications(Instant currentTime, Instant periodFromInc, Instant periodToEx);

}
