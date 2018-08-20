package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.BasicUser;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

class MongoProfileStore implements ProfileStore {

    private ReactiveMongoTemplate template;

    public MongoProfileStore(ReactiveMongoTemplate mongoTemplate) {
        this.template = mongoTemplate;
    }

    @Override
    public Mono<User> updateUserData(UserData user) {
        return template.findById(user.getId(), MongoUserImpl.class)
                .defaultIfEmpty(MongoUserImpl.from(user))
                .map(u -> u.updateUserData(user))
                .compose(template::save);

    }

    @Override
    public Mono<? extends User> findProfileById(String id) {
        return template
                .findById(id, MongoUserImpl.class)
                .flatMap(p ->
                    listAllUsers()
                            .filter(u -> !u.getId().equals(id))
                            .collectList()
                            .map(friends -> {
                                p.setFriends(friends);
                                return p;
                            }));
    }

    @Override
    public Flux<? extends UserData> listAllUsers() {
        return template.findAll(MongoUserImpl.class);
    }

    @Override
    public Mono<? extends User> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        return template.findById(id, MongoUserImpl.class)
                .map(u -> u.setRootOrder(todoOrder, groupOrder))
                .compose(template::save);
    }


}
