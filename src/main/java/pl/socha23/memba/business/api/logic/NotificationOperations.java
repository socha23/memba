package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.Todo;

import java.time.Instant;

/**
 *
 */
public interface NotificationOperations {
    void sendNotificationForTodo(String todoId);
    void sendNotificationForTodo(Todo todo, Instant sentOn, Instant periodFromInc, Instant periodToEx);

}
