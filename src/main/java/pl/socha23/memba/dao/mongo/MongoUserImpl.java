package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;

import java.util.List;

@Document(collection = "users")
public class MongoUserImpl implements User {
    private String id;
    private String firstName;
    private String fullName;
    private String pictureUrl;

    private List<String> rootGroupOrder;
    private List<String> rootTodoOrder;

    private List<? extends UserData> friends;

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
    public List<? extends UserData> getFriends() {
        return friends;
    }

    public void setFriends(List<? extends UserData> friends) {
        this.friends = friends;
    }

    public static MongoUserImpl from(UserData user) {
        var result = new MongoUserImpl();
        result.setId(user.getId());
        result.updateUserData(user);
        return result;
    }
    
    MongoUserImpl updateUserData(UserData user) {
        setFirstName(user.getFirstName());
        setFullName(user.getFullName());
        setPictureUrl(user.getPictureUrl());
        return this;
    }

    MongoUserImpl setRootOrder(List<String> todoOrder, List<String> groupOrder) {
        setRootTodoOrder(todoOrder);
        setRootGroupOrder(groupOrder);
        return this;
    }
}
