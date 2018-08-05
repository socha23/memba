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

@Component
class TodosOperationsImpl implements TodosOperations {

    private TodoStore todoStore;
    private CurrentUserProvider currentUserProvider;

    public TodosOperationsImpl(TodoStore todoStore, CurrentUserProvider currentUserProvider) {
        this.todoStore = todoStore;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public Flux<Todo> listCurrentUserTodos() {
        return todoStore.listTodosByUserId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<Todo> createTodo(Mono<? extends CreateTodo> createTodo) {

        return createTodo
                .map(this::doCreateTodo)
                .compose(todoStore::createTodo);
    }

    private Todo doCreateTodo(CreateTodo create) {
        var todo = new BasicTodo();

        todo.setOwnerId(currentUserProvider.getCurrentUserId());
        todo.setText(create.getText());
        todo.setCompleted(false);

        return todo;
    }

    @Override
    public Mono<Todo> updateTodo(String todoId, Mono<? extends UpdateTodo> updateTodo) {
        return todoStore
                .findTodoById(todoId)
                .zipWhen(t -> updateTodo, this::doUpdateTodo)
                .compose(todoStore::updateTodo);
    }

    private Todo doUpdateTodo(Todo todo, UpdateTodo updateTodo) {
        var newTodo = BasicTodo.copy(todo);

        if (updateTodo.isCompleted() != null) {
            newTodo.setCompleted(updateTodo.isCompleted());
        }

        return newTodo;
    }

}
