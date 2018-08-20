package pl.socha23.memba.business.api.model;

import java.util.List;

public interface User extends UserData {

    List<String> getRootGroupOrder();
    List<String> getRootTodoOrder();

    List<? extends UserData> getFriends();
}
