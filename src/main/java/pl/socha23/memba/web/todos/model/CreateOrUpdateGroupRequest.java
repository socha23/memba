package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.CreateOrUpdateGroup;

import java.util.List;

public class CreateOrUpdateGroupRequest extends AbstractCreateOrUpdateItemInGroupRequest implements CreateOrUpdateGroup {

    private String text = null;
    private String color = null;
    private String background = null;

    private List<String> groupOrder;
    private List<String> todoOrder;

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
    public List<String> getTodoOrder() {
        return todoOrder;
    }

    public void setTodoOrder(List<String> todoOrder) {
        this.todoOrder = todoOrder;
    }

    @Override
    public List<String> getGroupOrder() {
        return groupOrder;
    }

    public void setGroupOrder(List<String> groupOrder) {
        this.groupOrder = groupOrder;
    }

    @Override
    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }
}
