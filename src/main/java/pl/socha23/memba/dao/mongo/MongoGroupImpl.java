package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.Group;

@Document(collection = "groups")
class MongoGroupImpl extends BasicGroup implements Group {

    public static MongoGroupImpl copy(Group group) {
        return BasicGroup.copy(group, new MongoGroupImpl());
    }

}
