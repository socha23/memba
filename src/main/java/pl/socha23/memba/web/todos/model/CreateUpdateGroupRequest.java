package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.CreateGroup;
import pl.socha23.memba.business.api.model.UpdateGroup;

public class CreateUpdateGroupRequest implements CreateGroup, UpdateGroup {

    private String groupId = null;
    private String text = null;
    private String color = null;

    @Override
    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text != null ? text.trim() : null;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
