package pl.socha23.memba.dao.mongo;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.stereotype.Component;
import pl.socha23.memba.dao.mongo.migga.BasicMigrations;

import java.util.Collections;

@Component
public class MembaMigrations extends BasicMigrations implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
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

        add("2018-08-16 11:26", "Added indexes to todos and groups", mongo -> {

            var todoIdx = mongo.indexOps(MongoTodoImpl.class);
            todoIdx.ensureIndex(new Index().on("owners", Sort.Direction.ASC));
            todoIdx.ensureIndex(new Index().on("groupId", Sort.Direction.ASC));
            todoIdx.ensureIndex(new Index().on("completed", Sort.Direction.ASC));

            var groupIdx = mongo.indexOps(MongoGroupImpl.class);
            groupIdx.ensureIndex(new Index().on("owners", Sort.Direction.ASC));
            groupIdx.ensureIndex(new Index().on("groupId", Sort.Direction.ASC));
            groupIdx.ensureIndex(new Index().on("completed", Sort.Direction.ASC));
        });

    }
}
