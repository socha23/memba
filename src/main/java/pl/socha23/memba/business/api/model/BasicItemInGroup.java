package pl.socha23.memba.business.api.model;

import java.time.Instant;
import java.util.Set;

public class BasicItemInGroup implements ItemInGroup {
    private String id;
    private Instant createdOn;
    private Set<String> ownerIds;
    private String groupId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public Set<String> getOwnerIds() {
        return ownerIds;
    }

    public void setOwnerIds(Set<String> ownerIds) {
        this.ownerIds = ownerIds;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    protected static <T extends BasicItemInGroup, Q extends ItemInGroup> T copy(Q from, T to) {
        to.setId(from.getId());
        to.setCreatedOn(from.getCreatedOn());
        to.setOwnerIds(from.getOwnerIds());
        to.setGroupId(from.getGroupId());
        return to;

    }

}
