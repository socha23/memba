package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;

@Document(collection = "todo")
class MongoTodoImpl extends BasicTodo implements Todo {

    public static MongoTodoImpl copy(Todo todo) {
        return BasicTodo.copy(todo, new MongoTodoImpl());
    }

}
