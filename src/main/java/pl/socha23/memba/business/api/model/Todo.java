package pl.socha23.memba.business.api.model;

public interface Todo {
    String getId();
    String getOwnerId();
    String getText();
    boolean isCompleted();
}
