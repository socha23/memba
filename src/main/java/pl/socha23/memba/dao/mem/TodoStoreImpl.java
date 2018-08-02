package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.dao.TodoStore;
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
