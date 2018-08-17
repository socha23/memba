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

    private OwnershipManager ownershipManager;

    public TestOps() {
        todoStore = new MemTodoStore();
        groupStore = new MemGroupStore();
        userProvider = new TestUserProvider();

        ownershipManager = new OwnershipManagerImpl(groupStore, todoStore);

        todoOps = new TodosOperationsImpl(todoStore, userProvider, ownershipManager);
        groupOps = new GroupsOperationsImpl(todoStore, groupStore, userProvider, ownershipManager);
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

    public TestOps withTodo(Todo t) {
        todoStore.createTodo(Mono.just(t)).block();
        return this;
    }

    public TestOps withGroup(Group g) {
        groupStore.createGroup(Mono.just(g)).block();
        return this;
    }

    public MemTodoStore getTodoStore() {
        return todoStore;
    }

    public MemGroupStore getGroupStore() {
        return groupStore;
    }

    public Todo findTodoById(String id) {
        return todoStore.findTodoById(id).block();
    }

    public Group findGroupById(String id) {
        return groupStore.findGroupById(id).block();
    }
}
