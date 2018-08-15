package pl.socha23.memba.dao.mongo.migga;

import org.springframework.data.mongodb.core.MongoTemplate;

public interface Migration {

    String getMigrationId();

    void run(MongoTemplate mongo);
}
