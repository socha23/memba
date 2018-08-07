package pl.socha23.memba.business.api.model;

import java.time.Instant;

public class BasicTodo implements Todo {

    private String id;
    private String ownerId;

    private String text;
    private boolean completed;
    private Instant createdOn;
    private String color;



    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

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
    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public static BasicTodo copy(Todo todo) {
        return copy(todo, new BasicTodo());
    }

    protected static <T extends BasicTodo> T copy(Todo from, T to) {
        to.setId(from.getId());
        to.setOwnerId(from.getOwnerId());
        to.setText(from.getText());
        to.setCompleted(from.isCompleted());
        to.setCreatedOn(from.getCreatedOn());
        to.setColor(from.getColor());
        return to;

    }




}
