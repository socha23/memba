package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 *
 */
@Document(collection = "executed_migrations")
public class ExecutedMigration {

    @Id
    String id;
    String desc;
    Instant executedOn;

    public static ExecutedMigration of(Migration m) {
        var result = new ExecutedMigration();
        result.id = m.getMigrationId();
        result.desc = m.getDesc();
        result.executedOn = Instant.now();
        return result;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Instant getExecutedOn() {
        return executedOn;
    }

    public void setExecutedOn(Instant executedOn) {
        this.executedOn = executedOn;
    }
}
