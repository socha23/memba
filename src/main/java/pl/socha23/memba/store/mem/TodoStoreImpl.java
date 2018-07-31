package pl.socha23.memba.store.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.Todo;
import pl.socha23.memba.business.todos.TodoStore;

import java.util.ArrayList;
import java.util.List;

@Component
public class TodoStoreImpl implements TodoStore {

    @Override
    public List<Todo> listTodosByUserId(String userId) {
        var result = new ArrayList<Todo>();
        result.add(new TodoImpl("Papier"));
        result.add(new TodoImpl("Mydło"));
        result.add(new TodoImpl("Powidło"));
        return result;
    }
}
