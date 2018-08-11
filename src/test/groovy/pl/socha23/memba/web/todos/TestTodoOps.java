package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.CreateGroup;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.impl.TestUserProvider;
import pl.socha23.memba.business.impl.TodosOperationsImpl;
import pl.socha23.memba.dao.mem.MemGroupStore;
import pl.socha23.memba.dao.mem.MemTodoStore;
import reactor.core.publisher.Mono;

import java.util.List;

public class TestTodoOps extends TodosOperationsImpl {

    private MemTodoStore todoStore;
    private MemGroupStore groupStore;
    private TestUserProvider userProvider;

    public TestTodoOps() {
        this(new MemTodoStore(), new MemGroupStore(), new TestUserProvider());
    }

    private TestTodoOps(MemTodoStore memTodoStore, MemGroupStore memGroupStore, TestUserProvider testUserProvider) {
        super(memTodoStore, memGroupStore, testUserProvider);
        this.todoStore = memTodoStore;
        this.groupStore = memGroupStore;
        this.userProvider = testUserProvider;
    }

    public TestTodoOps createTodo(CreateTodo todo) {
        this.createTodo(Mono.just(todo)).block();
        return this;
    }

    public List<? extends Group> listGroups() {
        return groupStore
                .listGroupsByOwnerId(userProvider.getCurrentUserId())
                .collectList()
                .block();
    }

    public List<? extends Todo> listTodos() {
        return todoStore
                .listTodosByOwnerId(userProvider.getCurrentUserId())
                .collectList()
                .block();
    }

    public TestTodoOps createGroup(CreateGroup group) {
        this.createGroup(Mono.just(group)).block();
        return this;
    }

}
