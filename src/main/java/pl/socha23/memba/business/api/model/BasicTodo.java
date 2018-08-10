package pl.socha23.memba.business.api.model;

public class BasicTodo extends BasicItemInGroup implements Todo {

    private String text;
    private boolean completed;
    private String color;


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

    public static BasicTodo copy(Todo todo) {
        return copy(todo, new BasicTodo());
    }

    protected static <T extends BasicTodo, Q extends Todo> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setText(from.getText());
        to.setCompleted(from.isCompleted());
        to.setColor(from.getColor());
        return to;
    }




}
