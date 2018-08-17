package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.User;

@Document(collection = "users")
public class MongoUserImpl implements User {
    private String id;
    private String firstName;
    private String fullName;
    private String pictureUrl;

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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public static MongoUserImpl copy(User user) {
        var result = new MongoUserImpl();
        result.setId(user.getId());
        result.setFirstName(user.getFirstName());
        result.setFullName(user.getFullName());
        result.setPictureUrl(user.getPictureUrl());
        return result;
    }


}
