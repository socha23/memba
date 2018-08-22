package pl.socha23.memba.business.api.model;

import java.time.Instant;

public class BasicTodo extends BasicItemInGroup implements Todo {

    private String text;
    private boolean completed;
    private String color;
    private Instant when;


    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

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


    public static BasicTodo copy(Todo todo) {
        return copy(todo, new BasicTodo());
    }

    protected static <T extends BasicTodo, Q extends Todo> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setText(from.getText());
        to.setCompleted(from.isCompleted());
        to.setColor(from.getColor());
        to.setWhen(from.getWhen());
        return to;
    }




}
