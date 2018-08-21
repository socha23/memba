package pl.socha23.memba.business.api.model;

import java.util.List;

public class BasicUserProfileWithFriends implements UserProfileWithFriends {

    private UserProfile profile;
    private List<? extends User> friends;

    public BasicUserProfileWithFriends(UserProfile profile, List<? extends User> friends) {
        this.profile = profile;
        this.friends = friends;
    }

    public UserProfile getProfile() {
        return profile;
    }

    public List<? extends User> getFriends() {
        return friends;
    }

    @Override
    public List<String> getRootGroupOrder() {
        return profile.getRootGroupOrder();
    }

    @Override
    public List<String> getRootTodoOrder() {
        return profile.getRootTodoOrder();
    }

    @Override
    public String getId() {
        return profile.getId();
    }

    @Override
    public String getFirstName() {
        return profile.getFirstName();
    }

    @Override
    public String getFullName() {
        return profile.getFullName();
    }

    @Override
    public String getPictureUrl() {
        return profile.getPictureUrl();
    }
}
