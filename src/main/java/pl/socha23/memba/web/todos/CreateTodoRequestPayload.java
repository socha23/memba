package pl.socha23.memba.web.todos;

import pl.socha23.memba.business.api.model.CreateTodo;

public class CreateTodoRequestPayload implements CreateTodo {

    private String text = null;

    @Override
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
