package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.CreateOrUpdateTodo;
import pl.socha23.memba.web.todos.model.CreateOrUpdateTodoRequest;
import reactor.core.publisher.Mono;

public class TestCreateUpdateTodo extends CreateOrUpdateTodoRequest implements CreateOrUpdateTodo {

    private boolean completed;

    @Override
    public boolean isCompleted() {
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
