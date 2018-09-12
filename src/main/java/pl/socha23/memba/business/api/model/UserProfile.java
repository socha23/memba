package pl.socha23.memba.business.api.model;

import java.util.List;
import java.util.Set;

public interface UserProfile extends User {

    List<String> getRootGroupOrder();
    List<String> getRootTodoOrder();
}
