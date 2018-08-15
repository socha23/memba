package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Optional;

public interface Migrations {


    Optional<Migration> findMigrationById(String migrationId);

    void run(MongoTemplate mongo);
}
