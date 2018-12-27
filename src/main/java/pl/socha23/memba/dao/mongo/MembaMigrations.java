package pl.socha23.memba.dao.mongo;

import org.bson.Document;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.Reminder;
import pl.socha23.memba.dao.mongo.migga.BasicMigrations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

@Component
public class MembaMigrations extends BasicMigrations implements InitializingBean {

    @Override
    public void afterPropertiesSet() {

        add("2018-12-27 18:37", "Add reminders", mongo -> {

            for (Document todo : mongo.getCollection("todo").find()) {
                var reminders = new ArrayList<>();
                var when = todo.getDate("when");
                if (when != null) {
                    boolean inPast = when.before(new Date());
                    var reminder = new Document();
                    reminder.put("when", when);
                    reminder.put("notificationSentOn", inPast ? when : null);
                    reminders.add(reminder);
                }
                todo.put("reminders", reminders);
                mongo.save(todo, "todo");
            }
        });

        add("2018-09-14 00:40", "Reset push endpoints again", mongo -> {

            for (Document user : mongo.getCollection("users").find()) {
                user.put("pushSubscriptions", Collections.emptySet());
                user.put("pushEndpoints", null);
                mongo.save(user, "users");
            }
        });

        add("2018-09-13 00:54 ", "Reset push endpoints in profiles as type is changed", mongo -> {

            for (Document user : mongo.getCollection("users").find()) {
                user.put("pushEndpoints", Collections.emptySet());
                mongo.save(user, "users");
            }
        });


        add("2018-09-17 22:16 ", "Push endpoints in profiles", mongo -> {

            for (Document user : mongo.getCollection("users").find()) {
                user.put("pushEndpoints", Collections.emptySet());
                mongo.save(user, "users");
            }
        });

        add("2018-08-16 13:12 ", "Added owners to todos and groups", mongo -> {

            for (Document todo : mongo.getCollection("todo").find()) {
                todo.put("ownerIds", Collections.singleton(todo.get("ownerId")));
                mongo.save(todo, "todo");
            }

            for (Document group : mongo.getCollection("groups").find()) {
                group.put("ownerIds", Collections.singleton(group.get("ownerId")));
                mongo.save(group, "groups");
            }
        });

        add("2018-08-16 11:26", "Added indexes to todos and groups", mongo -> {

            var todoIdx = mongo.indexOps(MongoTodoImpl.class);
            todoIdx.ensureIndex(new Index().on("ownerIds", Sort.Direction.ASC));
            todoIdx.ensureIndex(new Index().on("groupId", Sort.Direction.ASC));
            todoIdx.ensureIndex(new Index().on("completed", Sort.Direction.ASC));

            var groupIdx = mongo.indexOps(MongoGroupImpl.class);
            groupIdx.ensureIndex(new Index().on("ownerIds", Sort.Direction.ASC));
            groupIdx.ensureIndex(new Index().on("groupId", Sort.Direction.ASC));
            groupIdx.ensureIndex(new Index().on("completed", Sort.Direction.ASC));
        });

    }
}
