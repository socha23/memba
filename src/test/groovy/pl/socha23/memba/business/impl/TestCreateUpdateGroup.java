package pl.socha23.memba.business.impl;

import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest;
import reactor.core.publisher.Mono;

public class TestCreateUpdateGroup extends CreateUpdateGroupRequest {

    public TestCreateUpdateGroup withText(String text) {
        this.setText(text);
        return this;
    }

    public TestCreateUpdateGroup withColor(String color) {
        this.setColor(color);
        return this;
    }

    public Mono<TestCreateUpdateGroup> toMono() {
        return Mono.just(this);
    }

    public static Mono<TestCreateUpdateGroup> monoWithText(String text) {
        return new TestCreateUpdateGroup().withText(text).toMono();
    }

}
