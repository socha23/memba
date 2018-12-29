package pl.socha23.memba.business.api.model;

import lombok.Data;
import pl.socha23.memba.util.DateUtils;

import java.time.Instant;
import java.util.Comparator;
import java.util.Objects;

@Data
public class Reminder implements Comparable<Reminder> {
    private Instant when;
    private Instant notificationSentOn;

    @Override
    public int compareTo(Reminder r) {
        return Objects.compare(this, r, Comparator.comparing(Reminder::getWhen));
    }

    public static Reminder forInstant(Instant i) {
        var result = new Reminder();
        result.setWhen(i);
        return result;
    }

    public boolean inRange(Instant periodFromInc, Instant periodToEx) {
        return DateUtils.isInRange(when, periodFromInc, periodToEx);
    }
}
