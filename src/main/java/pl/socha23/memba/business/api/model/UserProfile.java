package pl.socha23.memba.business.api.model;

import java.util.List;

public interface UserProfile extends User {

    List<String> getRootGroupOrder();
    List<String> getRootTodoOrder();

}
