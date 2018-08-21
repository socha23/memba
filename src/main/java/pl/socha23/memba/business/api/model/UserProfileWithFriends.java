package pl.socha23.memba.business.api.model;

import java.util.List;

public interface UserProfileWithFriends extends UserProfile {
    List<? extends User> getFriends();

}
