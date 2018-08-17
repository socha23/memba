package pl.socha23.memba.business.api.model;

import java.util.Set;

public interface CreateOrUpdateItemInGroup {

    Set<String> getOwnerIds();
    String getGroupId();

    default boolean changesParentGroup(ItemInGroup i) {
        return getGroupId() != null && !getGroupId().equals(i.getGroupId());
    }
}
