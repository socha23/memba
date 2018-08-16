package pl.socha23.memba.business.api.model;

import java.time.Instant;

public interface Item {
    String getId();
    Instant getCreatedOn();
}
