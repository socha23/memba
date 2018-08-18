package pl.socha23.memba.business.api.model;

import java.util.List;

public interface Profile extends User {

    List<? extends User> getFriends();
}
