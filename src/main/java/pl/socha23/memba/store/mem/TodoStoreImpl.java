package pl.socha23.memba.store.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.Todo;
import pl.socha23.memba.business.todos.TodoStore;
import reactor.core.publisher.Flux;

@Component
class TodoStoreImpl implements TodoStore {

    @Override
    public Flux<Todo> listTodosByUserId(String userId) {
        return Flux.just(
                new TodoImpl("1", "Papier"),
                new TodoImpl("2", "Mydło"),
                new TodoImpl("3", "Powidło")
        );
    }
}
