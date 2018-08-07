package pl.socha23.memba.business.api.model;

import java.time.Instant;

public interface Todo {
    String getId();
    String getOwnerId();
    String getText();
    boolean isCompleted();
    Instant getCreatedDate();

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    String getColor();
}
