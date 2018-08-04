package pl.socha23.memba.business.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.dao.TodoStore;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
class TodosOperationsImpl implements TodosOperations {

    private TodoStore todoStore;

    @Autowired
    public TodosOperationsImpl(TodoStore todoStore) {
        this.todoStore = todoStore;
    }

    @Override
    public Flux<Todo> listTodosByUserId(String userId) {
        return todoStore.listTodosByUserId(userId);
    }

    @Override
    public Mono<Todo> createTodo(String userId, Mono<? extends CreateTodo> createTodo) {
        return todoStore.createTodo(userId, createTodo);
    }

    @Override
    public Mono<Boolean> setCompleted(String currentUserId, String todoId, boolean completed) {
        return todoStore
                .findTodoById(todoId)
                .map(t -> assertCanComplete(currentUserId, t))
                .map(t -> doSetCompleted(t.getId(), completed));
    }

    private boolean doSetCompleted(String todoId, boolean completed) {
        todoStore.setCompleted(todoId, completed);
        return true;
    }

    private static Todo assertCanComplete(String currentUserId, Todo todo) {
        // TODO here is the right spot for checking todo access rights
        return todo;
    }


}
