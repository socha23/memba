package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;

import java.util.ArrayList;
import java.util.List;

public class ItemsRequestResult {

    private List<Group> groups;
    private List<Todo> completedTodos;
    private List<Todo> notCompletedTodos;

    public List<Group> getGroups() {
        return groups;
    }

    public List<Todo> getCompletedTodos() {
        return completedTodos;
    }

    public List<Todo> getNotCompletedTodos() {
        return notCompletedTodos;
    }

    public static ItemsRequestResult of(List<? extends Group> groups, List<? extends Todo> notCompletedTodos, List<? extends Todo> completedTodos) {
        ItemsRequestResult result = new ItemsRequestResult();
        result.groups = new ArrayList<>(groups);
        result.completedTodos = completedTodos != null ? new ArrayList<>(completedTodos) : null;
        result.notCompletedTodos = new ArrayList<>(notCompletedTodos);
        return result;
    }

}
