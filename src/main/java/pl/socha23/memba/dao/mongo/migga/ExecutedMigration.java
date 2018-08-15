package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 *
 */
@Document(collection = "executed_migrations")
public class ExecutedMigration {

    String migrationId;
    String desc;
    Instant executedOn;

    public ExecutedMigration(String migrationId) {
        this.migrationId = migrationId;
    }


}
