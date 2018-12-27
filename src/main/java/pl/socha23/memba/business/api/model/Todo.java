package pl.socha23.memba.business.api.model;

import java.time.Instant;
import java.util.SortedSet;

public interface Todo extends ItemInGroup {
    String getText();
    boolean isCompleted();

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    String getColor();

    Instant getWhen();

    SortedSet<Reminder> getReminders();
}
