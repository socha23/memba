package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface MongoExecutedMigrationsRepository extends CrudRepository<ExecutedMigration, String> {
}
