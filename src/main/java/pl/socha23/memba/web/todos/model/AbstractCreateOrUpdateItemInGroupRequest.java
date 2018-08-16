package pl.socha23.memba.web.todos.model;

import java.util.Set;

class AbstractCreateOrUpdateItemInGroupRequest {

    private String groupId = null;
    private Set<String> ownerIds = null;

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

}
