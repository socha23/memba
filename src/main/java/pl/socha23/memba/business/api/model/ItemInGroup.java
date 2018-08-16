package pl.socha23.memba.business.api.model;

public interface ItemInGroup extends SharedItem {
    String getGroupId();

    static boolean belongsToRoot(ItemInGroup i) {
        return i.getGroupId() == null || i.getGroupId().equals("root");
    }

}
