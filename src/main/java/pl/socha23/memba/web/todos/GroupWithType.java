package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;

public class GroupWithType extends BasicGroup implements ItemWithType {

    public String getItemType() {
        return "group";
    }

    static GroupWithType of(Group group) {
        return BasicGroup.copy(group, new GroupWithType());
    }
}
