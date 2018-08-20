package pl.socha23.memba.business.api.model;

import java.util.ArrayList;
import java.util.List;

public class BasicUser implements User {

    private UserData me;
    private List<? extends UserData> friends = new ArrayList<>();
    private List<String> rootGroupOrder;
    private List<String> rootTodoOrder;

    @Override
    public List<? extends UserData> getFriends() {
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

    @Override
    public List<String> getRootGroupOrder() {
        return rootGroupOrder;
    }

    @Override
    public List<String> getRootTodoOrder() {
        return rootTodoOrder;
    }
    public void setFriends(List<? extends User> friends) {
        this.friends = friends;
    }

    public void setRootGroupOrder(List<String> rootGroupOrder) {
        this.rootGroupOrder = rootGroupOrder;
    }

    public void setRootTodoOrder(List<String> rootTodoOrder) {
        this.rootTodoOrder = rootTodoOrder;
    }

    public static BasicUser from(UserData user) {
        var result = new BasicUser();
        result.me = user;
        return result;
    }


}
