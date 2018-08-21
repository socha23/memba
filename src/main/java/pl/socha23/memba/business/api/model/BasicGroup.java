package pl.socha23.memba.business.api.model;

import java.util.List;

public class BasicGroup extends BasicItemInGroup implements Group {

    private String text;
    private String color;
    private String background;

    private List<String> groupOrder;
    private List<String> todoOrder;
    
    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public List<String> getGroupOrder() {
        return groupOrder;
    }

    public void setGroupOrder(List<String> groupOrder) {
        this.groupOrder = groupOrder;
    }

    @Override
    public List<String> getTodoOrder() {
        return todoOrder;
    }

    public void setTodoOrder(List<String> todoOrder) {
        this.todoOrder = todoOrder;
    }

    @Override
    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public static BasicGroup copy(Group group) {
        return copy(group, new BasicGroup());
    }

    protected static <T extends BasicGroup, Q extends Group> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setGroupOrder(from.getGroupOrder());
        to.setTodoOrder(from.getTodoOrder());
        to.setText(from.getText());
        to.setColor(from.getColor());
        to.setBackground(from.getBackground());
        return to;
    }






}
