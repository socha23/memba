package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.model.PushSubscription;
import pl.socha23.memba.business.impl.PushNotificationSenderImpl;
import pl.socha23.memba.dao.cache.CachingProfileStore;

@Profile("mongo")
@Configuration
public class MongoConfiguration {

    @Bean
    public ProfileStore getStore(ReactiveMongoTemplate reactiveMongoTemplate, MongoTemplate mongoTemplate) {
        return new CachingProfileStore(new MongoProfileStore(reactiveMongoTemplate, mongoTemplate));
    }

    @Bean
    public PushSubscriptionStore getPushSubscriptionsStore(ReactiveMongoTemplate reactiveMongoTemplate, MongoTemplate mongoTemplate) {
        return new MongoProfileStore(reactiveMongoTemplate, mongoTemplate);
    }




    
}
