package pl.socha23.memba.dao.mongo;

import org.springframework.stereotype.Component;
import pl.socha23.memba.dao.mongo.migga.BasicMigrations;

import javax.annotation.PostConstruct;
import java.util.Collections;

@Component
public class MembaMigrations extends BasicMigrations {

    @PostConstruct
    void setup() {
        add("2018-08-16 00:18", "Added owners to todos and groups", mongo -> {

            for (var t : mongo.findAll(MongoTodoImpl.class)) {
                t.setOwners(Collections.singletonList(t.getOwnerId()));
                mongo.save(t);
            }

            for (var g : mongo.findAll(MongoGroupImpl.class)) {
                g.setOwners(Collections.singletonList(g.getOwnerId()));
                mongo.save(g);
            }
        });


    }
}
