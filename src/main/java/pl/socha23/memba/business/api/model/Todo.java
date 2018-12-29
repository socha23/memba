package pl.socha23.memba.business.api.model;

import lombok.Getter;
import lombok.Setter;
import pl.socha23.memba.util.DateUtils;

import java.time.Instant;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Stream;

@Getter
@Setter
public class Todo extends BasicItemInGroup {

    private String text;
    private boolean completed;

    /**
     * Color in CSS format, for example "red" or "#d244641"
     */
    private String color;

    private Instant when;

    private SortedSet<Reminder> reminders = new TreeSet<>();


    public static Todo copy(Todo todo) {
        return copy(todo, new Todo());
    }

    protected static <T extends Todo, Q extends Todo> T copy(Q from, T to) {
        BasicItemInGroup.copy(from, to);
        to.setText(from.getText());
        to.setCompleted(from.isCompleted());
        to.setColor(from.getColor());
        to.setWhen(from.getWhen());
        to.getReminders().addAll(from.getReminders());
        return to;
    }

    public boolean hasUnsentRemindersInPeriod(Instant fromInclusive, Instant toExclusive) {
        return unsentRemindersStream(fromInclusive, toExclusive).count() > 0;
    }

    private Stream<Reminder> unsentRemindersStream(Instant fromInc, Instant toEx) {
        return getReminders().stream()
            .filter(r -> r.getNotificationSentOn() == null)
            .filter(r -> DateUtils.isInRange(r.getWhen(), fromInc, toEx));
    }

    public void markUnsentNotificationsAsSent(Instant now, Instant fromInc, Instant toEx) {
            unsentRemindersStream(fromInc, toEx).forEach(r -> r.setNotificationSentOn(now));
    }
}
