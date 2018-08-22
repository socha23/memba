package pl.socha23.memba.web.todos.model;

import pl.socha23.memba.business.api.model.CreateOrUpdateTodo;

import java.time.Instant;

public class CreateOrUpdateTodoRequest extends AbstractCreateOrUpdateItemInGroupRequest implements CreateOrUpdateTodo {

    private String text;
    private boolean completed;
    private String color;
    private Instant when;

    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text != null ? text.trim() : null;
    }

    @Override
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public Instant getWhen() {
        return when;
    }

    public void setWhen(Instant when) {
        this.when = when;
    }

    public static CreateOrUpdateTodoRequest withCompleted(boolean completed) {
        var result = new CreateOrUpdateTodoRequest();
        result.setCompleted(completed);
        return result;
    }
}
