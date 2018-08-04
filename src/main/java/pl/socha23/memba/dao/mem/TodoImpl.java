package pl.socha23.memba.dao.mem;

import pl.socha23.memba.business.api.model.Todo;

class TodoImpl implements Todo {

    private String id;
    private String text;
    private boolean completed;

    TodoImpl(String id, String text) {
        this.id = id;
        this.text = text;
        completed = false;
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
    public boolean isCompleted() {
        return completed;
    }

    void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
