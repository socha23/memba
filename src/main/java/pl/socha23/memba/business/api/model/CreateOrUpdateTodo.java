package pl.socha23.memba.business.api.model;

import java.time.Instant;

public interface CreateOrUpdateTodo extends CreateOrUpdateItemInGroup {

    boolean isCompleted();
    String getText();
    String getColor();
    Instant getWhen();
}
