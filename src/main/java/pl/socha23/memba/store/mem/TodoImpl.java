package pl.socha23.memba.store.mem;

import pl.socha23.memba.business.Todo;

class TodoImpl implements Todo {

    private String id;
    private String text;
    private boolean done;

    TodoImpl(String id, String text) {
        this.id = id;
        this.text = text;
        done = false;
    }

    @Override
    public String getId() {
        return id;
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
