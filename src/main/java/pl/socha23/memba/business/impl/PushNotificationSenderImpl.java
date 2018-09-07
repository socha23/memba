package pl.socha23.memba.business.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class PushNotificationSenderImpl implements PushNotificationSender {



    WebClient webClient = WebClient.create();

    String serverKey;

    public PushNotificationSenderImpl(@Value("${memba.push.server_key}") String serverKey) {
        this.serverKey = serverKey;
    }

    @Override
    public Mono<Void> sendPushNotification(String endpoint) {
        return webClient
                .post()
                .uri(endpoint)
                .contentLength(0)
                .header("TTL", "60")
                .header("Authorization", "key=" + serverKey)
                .exchange()
                .flatMap(
                        r -> {
                            System.out.println("Push to " + endpoint + " with server key " + serverKey + " results in " + r.statusCode().toString());
                            return Mono.empty();
                        }
                );
    }
}
