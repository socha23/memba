package pl.socha23.memba.business.api.model;

public class BasicTodo implements Todo {

    private String id;
    private String ownerId;

    private String text;
    private boolean completed;

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

    public static BasicTodo copy(Todo todo) {
        var result = new BasicTodo();

        result.setId(todo.getId());
        result.setOwnerId(todo.getOwnerId());
        result.setText(todo.getText());
        result.setCompleted(todo.isCompleted());

        return result;
    }


}
