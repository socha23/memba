package pl.socha23.memba.dao.mongo.migga;

public interface ExecutedMigrationsStore {

    boolean migrationWasExecuted(String migrationId);

    void markAsExecuted(Migration m);
}
