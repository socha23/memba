package pl.socha23.memba.dao.mongo.migga;

import org.springframework.stereotype.Component;

@Component
public class MongoExecutedMigrationsStore implements ExecutedMigrationsStore {

    private MongoExecutedMigrationsRepository repository;

    public MongoExecutedMigrationsStore(MongoExecutedMigrationsRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean migrationWasExecuted(String migrationId) {
        return repository.existsById(migrationId);
    }

    @Override
    public void markAsExecuted(Migration m) {
        repository.save(ExecutedMigration.of(m));

    }
}
