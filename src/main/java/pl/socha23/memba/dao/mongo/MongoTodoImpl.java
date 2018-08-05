package pl.socha23.memba.dao.mongo;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;

import java.time.Instant;

@Document("todo")
class MongoTodoImpl extends BasicTodo implements Todo {

    @CreatedDate
    private Instant createdDate;


    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public static MongoTodoImpl copy(Todo todo) {
        var result = new MongoTodoImpl();

        result.setId(todo.getId());
        result.setOwnerId(todo.getOwnerId());
        result.setText(todo.getText());
        result.setCompleted(todo.isCompleted());

        return result;
    }

}
