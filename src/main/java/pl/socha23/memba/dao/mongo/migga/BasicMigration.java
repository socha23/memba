package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.function.Consumer;

class BasicMigration implements Migration {

    private String migrationId;
    private String desc;
    private Consumer<MongoTemplate> action;


    public BasicMigration(String migrationId, String desc, Consumer<MongoTemplate> action) {
        this.migrationId = migrationId;
        this.desc = desc == null ? "" : desc;
        this.action = action;
    }

    public BasicMigration(String migrationId, Consumer<MongoTemplate> action) {
        this(migrationId, "", action);
    }

    public String getMigrationId() {
        return migrationId;
    }

    public String getDesc() {
        return desc;
    }

    @Override
    public void run(MongoTemplate mongo) {
        this.action.accept(mongo);
    }
}
