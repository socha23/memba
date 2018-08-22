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

import java.time.Instant;
import java.util.Collections;

@Component
public class TodosOperationsImpl extends AbstractItemInGroupOperationsImpl<BasicTodo> implements TodosOperations {

    private TodoStore<? extends Todo> todoStore;
    private CurrentUserProvider currentUserProvider;
    private OwnershipManager ownershipManager;

    public TodosOperationsImpl(
            TodoStore<? extends Todo> todoStore,
            CurrentUserProvider currentUserProvider,
            OwnershipManager ownershipManager) {
        super(ownershipManager);
        this.todoStore = todoStore;
        this.currentUserProvider = currentUserProvider;
        this.ownershipManager = ownershipManager;
    }

    @Override
    public Flux<? extends Todo> listCurrentUserTodos() {
        return todoStore.listTodosByOwnerId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<? extends Todo> createTodo(Mono<? extends CreateOrUpdateTodo> command) {

        return command
                .map(this::createTodoObject)
                .flatMap(ownershipManager::copyParentOwnership)
                .transform(todoStore::createTodo);
    }

    private BasicTodo createTodoObject(CreateOrUpdateTodo create) {
        var todo = new BasicTodo();
        setFields(todo, create);
        todo.setCreatedOn(Instant.now());
        return todo;
    }

    @Override
    public Mono<? extends Todo> updateTodo(String todoId, Mono<? extends CreateOrUpdateTodo> command) {
        return todoStore
                .findTodoById(todoId)
                .zipWith(command)
                .flatMap(t -> {
                    var result = updateFields(t.getT1(), t.getT2());
                    return setOwnershipIfNeeded(result, t.getT1(), t.getT2());
                })
                .transform(todoStore::updateTodo);
    }

    private BasicTodo updateFields(Todo todo, CreateOrUpdateTodo updateTodo) {
        var newTodo = BasicTodo.copy(todo);
        setFields(newTodo, updateTodo);
        return newTodo;
    }

    private void setFields(BasicTodo todo, CreateOrUpdateTodo command) {
        todo.setOwnerIds(command.getOwnerIds() != null ? command.getOwnerIds() : Collections.singleton(currentUserProvider.getCurrentUserId()));
        todo.setGroupId(command.getGroupId());
        todo.setText(command.getText());
        todo.setCompleted(command.isCompleted());
        todo.setColor(command.getColor());
        todo.setWhen(command.getWhen());
    }

    @Override
    public Mono<Void> deleteTodo(String todoId) {
        return todoStore.deleteTodo(todoId);
    }

}
