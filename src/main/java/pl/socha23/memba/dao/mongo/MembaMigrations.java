package pl.socha23.memba.dao.mongo;

import org.springframework.stereotype.Component;
import pl.socha23.memba.dao.mongo.migga.BasicMigrations;

import javax.annotation.PostConstruct;

@Component
public class MembaMigrations extends BasicMigrations {

    private MongoGroupRepository groupRepo;
    private MongoTodoRepository todoRepo;

    public MembaMigrations(MongoGroupRepository groupRepo, MongoTodoRepository todoRepo) {
        this.groupRepo = groupRepo;
        this.todoRepo = todoRepo;
    }

    @PostConstruct
    void setup() {
    }
}
