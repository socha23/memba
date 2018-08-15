package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.Group;

import java.util.Collections;
import java.util.List;

@Document(collection = "groups")
class MongoGroupImpl extends BasicGroup implements Group {

    private List<String> owners;

    public List<String> getOwners() {
        return owners;
    }

    public void setOwners(List<String> owners) {
        this.owners = owners;
    }

    public static MongoGroupImpl copy(Group group) {
        MongoGroupImpl result = BasicGroup.copy(group, new MongoGroupImpl());
        result.setOwners(Collections.singletonList(group.getOwnerId()));
        return result;
    }

}
