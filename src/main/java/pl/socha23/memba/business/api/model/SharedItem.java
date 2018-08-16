package pl.socha23.memba.business.api.model;

import java.util.Set;

public interface SharedItem extends Item {
    Set<String> getOwnerIds();
}
