package pl.socha23.memba.business.todos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.Todo;

import java.util.List;

@Component
class ListTodosImpl implements ListTodos {

    private TodoStore todoStore;

    @Autowired
    public ListTodosImpl(TodoStore todoStore) {
        this.todoStore = todoStore;
    }

    @Override
    public List<Todo> listTodos(String userId) {
        return todoStore.listTodosByUserId(userId);
    }


}
