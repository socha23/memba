package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;

@Document(collection = "groups")
class MongoGroupImpl extends BasicGroup implements Group {

    public static MongoGroupImpl copy(Group todo) {
        return BasicGroup.copy(todo, new MongoGroupImpl());
    }

}
