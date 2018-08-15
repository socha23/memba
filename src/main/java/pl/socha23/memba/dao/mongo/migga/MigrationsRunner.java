package pl.socha23.memba.dao.mongo.migga;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class MigrationsRunner {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    private MongoTemplate mongo;


    public MigrationsRunner(MongoTemplate mongo) {
        this.mongo = mongo;
    }

    void runMigrations(Migrations migrations) {
        migrations.getMigrations()
                .stream().forEach(m -> {
                    logger.info("Running migration " + m.getMigrationId() + " " + m.getDesc());
                    m.run(mongo);
        });

    }
}
