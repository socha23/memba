package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;

import java.util.Collections;
import java.util.List;

@Document(collection = "todo")
class MongoTodoImpl extends BasicTodo implements Todo {

    private List<String> owners;

    public List<String> getOwners() {
        return owners;
    }

    public void setOwners(List<String> owners) {
        this.owners = owners;
    }

    public static MongoTodoImpl copy(Todo todo) {
        var result = BasicTodo.copy(todo, new MongoTodoImpl());
        result.setOwners(Collections.singletonList(todo.getOwnerId()));
        return result;
    }

}
