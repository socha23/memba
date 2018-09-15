package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.NotificationOperations;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.api.model.Todo;

import java.time.Instant;

@Component
public class NotificationOperationsImpl implements NotificationOperations {

    private TodoStore todoStore;
    private OwnershipManager ownershipManager;
    private PushOperations pushOperations;

    public NotificationOperationsImpl(TodoStore todoStore, OwnershipManager ownershipManager, PushOperations pushOperations) {
        this.todoStore = todoStore;
        this.ownershipManager = ownershipManager;
        this.pushOperations = pushOperations;
    }

    @Override
    public void sendNotificationForTodo(String todoId) {
        sendNotificationForTodo(todoStore.findTodoById(todoId));
    }

    @Override
    public void sendNotificationForTodo(Todo todo) {
        var ownerIds = ownershipManager.getOwnerIds(todo);
        for (var owner : ownerIds) {
            pushOperations.pushTo(owner, todo);
        }
    }
}
