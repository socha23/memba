package pl.socha23.memba.business.api.model;

import java.util.ArrayList;
import java.util.List;

public class BasicProfile implements Profile {

    private User me;
    private List<? extends User> friends = new ArrayList<>();

    @Override
    public List<? extends User> getFriends() {
        return friends;
    }

    @Override
    public String getId() {
        return me.getId();
    }

    @Override
    public String getFirstName() {
        return me.getFirstName();
    }

    @Override
    public String getFullName() {
        return me.getFullName();
    }

    @Override
    public String getPictureUrl() {
        return me.getPictureUrl();
    }

    public void setFriends(List<? extends User> friends) {
        this.friends = friends;
    }

    public static BasicProfile from(User user) {
        var result = new BasicProfile();
        result.me = user;
        return result;
    }


}
