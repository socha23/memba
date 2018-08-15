package pl.socha23.memba.dao.mongo.migga;

import java.util.*;

public class BasicMigrations implements Migrations {

    private List<Migration> migrations = new ArrayList<>();
    private Map<String, Migration> idToMigrations = new HashMap<>();

    @Override
    public final Optional<Migration> findMigrationById(String migrationId) {
        return Optional.ofNullable(idToMigrations.get(migrationId));
    }

    @Override
    public final List<Migration> getMigrations() {
        return migrations;
    }

    public final BasicMigrations add(Migration migration) {
        if (idToMigrations.containsKey(migration.getMigrationId())) {
            throw new IllegalArgumentException("Duplicate migration id " + migration.getMigrationId());
        }
        migrations.add(migration);
        idToMigrations.put(migration.getMigrationId(), migration);
        return this;
    }
}
