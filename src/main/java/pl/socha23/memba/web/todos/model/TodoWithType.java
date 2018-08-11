package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;

public class TodoWithType extends BasicTodo implements ItemWithType {

    public String getItemType() {
        return "todo";
    }

    public static TodoWithType of(Todo todo) {
        return BasicTodo.copy(todo, new TodoWithType());
    }
}
