package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.CreateGroup;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.impl.TestUserProvider;
import pl.socha23.memba.business.impl.TodosOperationsImpl;
import pl.socha23.memba.dao.mem.MemGroupStore;
import pl.socha23.memba.dao.mem.MemTodoStore;
import reactor.core.publisher.Mono;

public class TestTodoOps extends TodosOperationsImpl {

    public TestTodoOps() {
        super(new MemTodoStore(), new MemGroupStore(), new TestUserProvider());
    }

    public TestTodoOps createTodo(CreateTodo todo) {
        this.createTodo(Mono.just(todo)).block();
        return this;
    }

    public TestTodoOps createGroup(CreateGroup group) {
        this.createGroup(Mono.just(group)).block();
        return this;
    }

}
