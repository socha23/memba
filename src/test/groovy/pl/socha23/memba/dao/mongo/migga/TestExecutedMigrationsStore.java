package pl.socha23.memba.dao.mongo.migga;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

class TestExecutedMigrationsStore implements ExecutedMigrationsStore {

    private Set<String> alreadyExecuted = new HashSet<>();

    TestExecutedMigrationsStore(Collection<String> alreadyExecuted) {
        if (alreadyExecuted != null) {
            this.alreadyExecuted.addAll(alreadyExecuted);
        }
    }

    @Override
    public boolean migrationWasExecuted(String migrationId) {
        return alreadyExecuted.contains(migrationId);
    }

    @Override
    public void markAsExecuted(Migration m) {
        alreadyExecuted.add(m.getMigrationId());
    }
}
