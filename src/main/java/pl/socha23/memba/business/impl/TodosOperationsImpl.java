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


}
