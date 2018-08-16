package pl.socha23.memba.business.api.model;

import java.util.Set;

public interface CreateOrUpdateGroup {

    Set<String> getOwnerIds();
    String getGroupId();
    String getText();
    String getColor();
}
