package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.CreateTodo;

public class CreateTodoRequest implements CreateTodo {

    private String groupId = null;
    private String text = null;
    private String color = null;

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

    @Override
    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
}
