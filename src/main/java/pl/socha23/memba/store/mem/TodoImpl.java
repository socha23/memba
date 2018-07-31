package pl.socha23.memba.store.mem;

import pl.socha23.memba.business.Todo;

public class TodoImpl implements Todo {

    private String text;
    private boolean done;

    public TodoImpl(String aText) {
        text = aText;
        done = false;
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public boolean isDone() {
        return done;
    }
}
