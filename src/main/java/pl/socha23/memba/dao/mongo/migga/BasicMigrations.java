package pl.socha23.memba.dao.mongo.migga;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class BasicMigrations implements Migrations {

    private List<Migration> migrations = new ArrayList<>();

    @Override
    public Optional<Migration> findMigrationById(String migrationId) {
        return migrations.stream()
                .filter(m -> m.getMigrationId().equals(migrationId))
                .findFirst();
    }

    @Override
    public List<Migration> getMigrations() {
        return migrations;
    }

    public BasicMigrations add(Migration migration) {
        migrations.add(migration);
        return this;
    }
}
