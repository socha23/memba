package pl.socha23.memba.business.api.model;

public interface CreateOrUpdateTodo extends CreateOrUpdateItemInGroup {

    Boolean isCompleted();
    String getText();
    String getColor();
}
