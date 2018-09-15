package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.Todo;

/**
 *
 */
public interface NotificationOperations {
    void sendNotificationForTodo(String todoId);
    void sendNotificationForTodo(Todo todo);

}
