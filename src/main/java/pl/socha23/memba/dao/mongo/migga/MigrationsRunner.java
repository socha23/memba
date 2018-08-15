package pl.socha23.memba.dao.mongo.migga;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class MigrationsRunner {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private MongoTemplate mongo;
    private ExecutedMigrationsStore store;


    public MigrationsRunner(MongoTemplate mongo, ExecutedMigrationsStore store) {
        this.mongo = mongo;
        this.store = store;
    }

    void runMigrations(Migrations migrations) {
        migrations.getMigrations()
                .stream()
                .filter(m -> !store.migrationWasExecuted(m.getMigrationId()))
                .forEach(m -> {
                    logger.info("Running migration " + m.getMigrationId() + " " + m.getDesc());
                    m.run(mongo);
                    store.markAsExecuted(m);
        });

    }
}
