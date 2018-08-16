package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.logic.GroupsOperations;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.CreateOrUpdateGroup;
import pl.socha23.memba.business.api.model.CreateOrUpdateTodo;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.dao.mem.MemGroupStore;
import pl.socha23.memba.dao.mem.MemTodoStore;
import reactor.core.publisher.Mono;

import java.util.List;

public class TestOps {

    private MemTodoStore todoStore;
    private MemGroupStore groupStore;
    private TestUserProvider userProvider;

    private TodosOperations todoOps;
    private GroupsOperations groupOps;

    public TestOps() {
        todoStore = new MemTodoStore();
        groupStore = new MemGroupStore();
        userProvider = new TestUserProvider();

        todoOps = new TodosOperationsImpl(todoStore, userProvider);
        groupOps = new GroupsOperationsImpl(todoStore, groupStore, userProvider);
    }

    public TodosOperations getTodoOps() {
        return todoOps;
    }

    public GroupsOperations getGroupOps() {
        return groupOps;
    }

    public TestOps createTodo(CreateOrUpdateTodo todo) {
        this.todoOps.createTodo(Mono.just(todo)).block();
        return this;
    }

    public List<? extends Todo> listTodos() {
        return todoStore
                .listTodosByOwnerId(userProvider.getCurrentUserId())
                .collectList()
                .block();
    }

    public TestOps createGroup(CreateOrUpdateGroup group) {
        this.groupOps.createGroup(Mono.just(group)).block();
        return this;
    }

    public List<? extends Group> listGroups() {
        return groupStore
                .listGroupsByOwnerId(userProvider.getCurrentUserId())
                .collectList()
                .block();
    }


}
