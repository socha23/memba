package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.UpdateTodo;

public class UpdateTodoRequest implements UpdateTodo {

    private String text;
    private Boolean completed;
    private String color;

    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text != null ? text.trim() : null;
    }

    @Override
    public Boolean isCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    static UpdateTodoRequest withCompleted(boolean completed) {
        var result = new UpdateTodoRequest();
        result.setCompleted(completed);
        return result;
    }
}
