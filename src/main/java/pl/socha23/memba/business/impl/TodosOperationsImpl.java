package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.model.UpdateTodo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Component
public class TodosOperationsImpl implements TodosOperations {

    private TodoStore<? extends Todo> todoStore;
    private CurrentUserProvider currentUserProvider;

    public TodosOperationsImpl(TodoStore<? extends Todo> todoStore, CurrentUserProvider currentUserProvider) {
        this.todoStore = todoStore;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public Flux<? extends Todo> listCurrentUserTodos() {
        return todoStore.listTodosByOwnerId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<? extends Todo> createTodo(Mono<? extends CreateTodo> createTodo) {

        return createTodo
                .map(this::doCreateTodo)
                .compose(todoStore::createTodo);
    }

    private Todo doCreateTodo(CreateTodo create) {
        var todo = new BasicTodo();

        todo.setOwnerId(currentUserProvider.getCurrentUserId());
        todo.setGroupId(create.getGroupId());
        todo.setText(create.getText());
        todo.setCompleted(false);
        todo.setColor(create.getColor());
        todo.setCreatedOn(Instant.now());

        return todo;
    }

    @Override
    public Mono<? extends Todo> updateTodo(String todoId, Mono<? extends UpdateTodo> updateTodo) {
        return todoStore
                .findTodoById(todoId)
                .zipWith(updateTodo, this::doUpdateTodo)
                .compose(todoStore::updateTodo);
    }

    private BasicTodo doUpdateTodo(Todo todo, UpdateTodo updateTodo) {
        var newTodo = BasicTodo.copy(todo);

        if (updateTodo.getGroupId() != null) {
            newTodo.setGroupId(updateTodo.getGroupId());
        }

        if (updateTodo.isCompleted() != null) {
            newTodo.setCompleted(updateTodo.isCompleted());
        }

        if (updateTodo.getText() != null) {
            newTodo.setText(updateTodo.getText());
        }

        if (updateTodo.getColor() != null) {
            newTodo.setColor(updateTodo.getColor());
        }

        return newTodo;
    }
}
