package pl.socha23.memba.business.api.model;

public interface ItemInGroup extends SharedItem {

    String ROOT_ID = "root";

    String getGroupId();

    static boolean belongsToRoot(ItemInGroup i) {
        return i.getGroupId() == null || i.getGroupId().equals(ROOT_ID);
    }

}
