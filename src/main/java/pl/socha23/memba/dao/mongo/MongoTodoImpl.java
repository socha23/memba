package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.Todo;

@Document(collection = "todo")
class MongoTodoImpl extends Todo {

    public static MongoTodoImpl copy(Todo todo) {
        return Todo.copy(todo, new MongoTodoImpl());
    }

}
