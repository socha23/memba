package pl.socha23.memba.business.api.model;

import java.time.Instant;

public class BasicItemInGroup {
    private String id;
    private Instant createdOn;
    private String ownerId;
    private String groupId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
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
        to.setOwnerId(from.getOwnerId());
        to.setGroupId(from.getGroupId());
        return to;

    }

}
