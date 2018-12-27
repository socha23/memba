package pl.socha23.memba.util;

import java.time.Instant;

public class DateUtils {

    public static boolean isInRange(Instant i, Instant fromInclusive, Instant toExclusive) {
        return !i.isBefore(fromInclusive) && i.isBefore(toExclusive);
    }

}
