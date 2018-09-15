package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.Todo;

import java.time.Instant;
import java.util.Collection;

public interface TodosNeedingNotificationProvider {
    Collection<? extends Todo> listTodosRequiringNotificationInPeriod(Instant fromInclusive, Instant toExclusive);
}
