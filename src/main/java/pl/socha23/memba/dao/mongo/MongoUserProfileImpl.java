package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "users")
public class MongoUserProfileImpl implements UserProfile {
    private String id;
    private String firstName;
    private String fullName;
    private String pictureUrl;

    private List<String> rootGroupOrder;
    private List<String> rootTodoOrder;
    private Set<String> pushEndpoints = new HashSet<>();

    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getFullName() {
        return fullName;
    }

    void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public String getPictureUrl() {
        return pictureUrl;
    }

    void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public List<String> getRootGroupOrder() {
        return rootGroupOrder;
    }

    void setRootGroupOrder(List<String> rootGroupOrder) {
        this.rootGroupOrder = rootGroupOrder;
    }

    public List<String> getRootTodoOrder() {
        return rootTodoOrder;
    }

    void setRootTodoOrder(List<String> rootTodoOrder) {
        this.rootTodoOrder = rootTodoOrder;
    }

    @Override
    public Set<String> getPushEndpoints() {
        return pushEndpoints;
    }

    public void setPushEndpoints(Set<String> pushEndpoints) {
        this.pushEndpoints = pushEndpoints;
    }

    MongoUserProfileImpl addPushEndpoint(String endpoint) {
        getPushEndpoints().add(endpoint);
        return this;
    }

    public static MongoUserProfileImpl from(User user) {
        var result = new MongoUserProfileImpl();
        result.setId(user.getId());
        result.updateUserData(user);
        return result;
    }
    
    MongoUserProfileImpl updateUserData(User user) {
        setFirstName(user.getFirstName());
        setFullName(user.getFullName());
        setPictureUrl(user.getPictureUrl());
        return this;
    }

    MongoUserProfileImpl setRootOrder(List<String> todoOrder, List<String> groupOrder) {
        setRootTodoOrder(todoOrder);
        setRootGroupOrder(groupOrder);
        return this;
    }
}
