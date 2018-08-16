package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.CreateOrUpdateTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuples;

import java.time.Instant;
import java.util.Collections;

@Component
public class TodosOperationsImpl implements TodosOperations {

    private TodoStore<? extends Todo> todoStore;
    private CurrentUserProvider currentUserProvider;
    private OwnershipManager ownershipManager;

    public TodosOperationsImpl(
            TodoStore<? extends Todo> todoStore,
            CurrentUserProvider currentUserProvider,
            OwnershipManager ownershipManager) {
        this.todoStore = todoStore;
        this.currentUserProvider = currentUserProvider;
        this.ownershipManager = ownershipManager;
    }

    @Override
    public Flux<? extends Todo> listCurrentUserTodos() {
        return todoStore.listTodosByOwnerId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<? extends Todo> createTodo(Mono<? extends CreateOrUpdateTodo> createTodo) {

        return createTodo
                .map(this::doCreateTodo)
                .zipWith(createTodo)
                .flatMap(t -> setOwnershipIfNeeded(t.getT1(), t.getT2()))
                .compose(todoStore::createTodo);
    }

    private BasicTodo doCreateTodo(CreateOrUpdateTodo create) {
        var todo = new BasicTodo();

        todo.setOwnerIds(create.getOwnerIds() != null ? create.getOwnerIds() : Collections.singleton(currentUserProvider.getCurrentUserId()));
        todo.setGroupId(create.getGroupId());
        todo.setText(create.getText());
        todo.setCompleted(false);
        todo.setColor(create.getColor());
        todo.setCreatedOn(Instant.now());

        return todo;
    }

    @Override
    public Mono<? extends Todo> updateTodo(String todoId, Mono<? extends CreateOrUpdateTodo> updateTodoCommand) {
        return todoStore
                .findTodoById(todoId)
                .zipWith(updateTodoCommand)
                .map(t -> Tuples.of(doUpdateTodo(t.getT1(), t.getT2()), t.getT2()))
                .flatMap(t -> setOwnershipIfNeeded(t.getT1(), t.getT2()))
                .compose(todoStore::updateTodo);
    }

    @Override
    public Mono<Void> deleteTodo(String todoId) {
        return todoStore.deleteTodo(todoId);
    }

    private Mono<BasicTodo> setOwnershipIfNeeded(BasicTodo todo, CreateOrUpdateTodo updateTodo) {
        if (updateTodo.getGroupId() != null) {
            return ownershipManager.setOwnersToParentGroupOwners(todo);
        } else {
            return Mono.just(todo);
        }
    }

    private BasicTodo doUpdateTodo(Todo todo, CreateOrUpdateTodo updateTodo) {
        var newTodo = BasicTodo.copy(todo);

        if (updateTodo.getOwnerIds() != null) {
            newTodo.setOwnerIds(updateTodo.getOwnerIds());
        }

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
