package pl.socha23.memba.business.api.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class BasicUserProfile implements UserProfile {

    private User me;
    private List<String> rootGroupOrder;
    private List<String> rootTodoOrder;
    private Set<String> pushEndpoints = new HashSet<>();

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

    public void setRootGroupOrder(List<String> rootGroupOrder) {
        this.rootGroupOrder = rootGroupOrder;
    }

    public void setRootTodoOrder(List<String> rootTodoOrder) {
        this.rootTodoOrder = rootTodoOrder;
    }

    @Override
    public Set<String> getPushEndpoints() {
        return pushEndpoints;
    }

    public void setPushEndpoints(Set<String> pushEndpoints) {
        this.pushEndpoints = pushEndpoints;
    }

    public static BasicUserProfile from(User user) {
        var result = new BasicUserProfile();
        result.me = user;
        return result;
    }


}
