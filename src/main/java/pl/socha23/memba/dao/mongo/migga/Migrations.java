package pl.socha23.memba.dao.mongo.migga;

import java.util.List;
import java.util.Optional;

public interface Migrations {


    Optional<Migration> findMigrationById(String migrationId);

    List<Migration> getMigrations();
}
