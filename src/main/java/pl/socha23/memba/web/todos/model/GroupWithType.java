package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.Group;

public class GroupWithType extends BasicGroup implements ItemWithType {

    public String getItemType() {
        return "group";
    }

    public static GroupWithType of(Group group) {
        return BasicGroup.copy(group, new GroupWithType());
    }
}
