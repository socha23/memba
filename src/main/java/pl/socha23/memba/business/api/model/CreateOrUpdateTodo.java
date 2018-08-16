package pl.socha23.memba.business.api.model;

import java.util.Set;

public interface CreateOrUpdateTodo {

    Set<String> getOwnerIds();
    Boolean isCompleted();
    String getGroupId();
    String getText();
    String getColor();
}
