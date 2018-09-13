package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.NotificationOperations;
import pl.socha23.memba.business.api.model.Todo;

@Component
public class NotificationOperationsImpl implements NotificationOperations {

    private TodoStore todoStore;
    private OwnershipManager ownershipManager;

    public NotificationOperationsImpl(TodoStore todoStore, OwnershipManager ownershipManager) {
        this.todoStore = todoStore;
        this.ownershipManager = ownershipManager;
    }

    @Override
    public void pushTodo(String todoId) {
        Todo todo = todoStore.findTodoById(todoId);
        

    }


}
