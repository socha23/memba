package pl.socha23.memba.business.todos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.Todo;
import reactor.core.publisher.Flux;

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


}
