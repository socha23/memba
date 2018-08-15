package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.mongodb.core.MongoTemplate;

public class TestMigration extends BasicMigration {

    private boolean executed;

    public TestMigration(String migrationId) {
        super(migrationId, null);
    }

    boolean isExecuted() {
        return executed;
    }

    @Override
    public void run(MongoTemplate mongo) {
        this.executed = true;
    }
}
