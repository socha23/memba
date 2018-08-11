package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.UpdateTodo;
import pl.socha23.memba.web.todos.model.CreateTodoRequest;
import reactor.core.publisher.Mono;

public class TestCreateUpdateTodo extends CreateTodoRequest implements CreateTodo, UpdateTodo {

    private Boolean completed;

    @Override
    public Boolean isCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public TestCreateUpdateTodo withText(String text) {
        this.setText(text);
        return this;
    }

    public TestCreateUpdateTodo withColor(String color) {
        this.setColor(color);
        return this;
    }

    public Mono<TestCreateUpdateTodo> toMono() {
        return Mono.just(this);
    }

    public static Mono<TestCreateUpdateTodo> monoWithText(String text) {
        return new TestCreateUpdateTodo().withText(text).toMono();
    }

}
