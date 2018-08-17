package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;

import static org.springframework.data.mongodb.core.query.Criteria.where;

class MongoProfileStore implements ProfileStore {

    private ReactiveMongoTemplate template;

    public MongoProfileStore(ReactiveMongoTemplate mongoTemplate) {
        this.template = mongoTemplate;
    }

    @Override
    public Mono<User> updateProfile(User user) {
        return template.save(MongoUserImpl.copy(user));
    }

    @Override
    public Mono<? extends User> findProfileById(String id) {
        return template.findById(id, MongoUserImpl.class);
    }


}
