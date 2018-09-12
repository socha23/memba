package pl.socha23.memba.business.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import pl.socha23.memba.business.api.model.PushSubscription;

import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED;
import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.SUCCESS;

@Component
public class PushNotificationSenderImpl implements PushNotificationSender {



    WebClient webClient = WebClient.create();

    String serverKey;

    public PushNotificationSenderImpl(@Value("${memba.push.server_key}") String serverKey) {
        this.serverKey = serverKey;
    }

    @Override
    public PushResult sendPushNotification(PushSubscription subscription) {
        return webClient
                .post()
                .uri(subscription.getEndpoint())
                .contentLength(0)
                .header("TTL", "60")
                .header("Authorization", "key=" + serverKey)
                .exchange()
                .map(
                        r -> {
                            System.out.println("Push to " + subscription.getEndpoint() + " with server key " + serverKey + " results in " + r.statusCode().toString());

                            if (r.statusCode().value() == 201) {
                                System.out.println("Push successfull");
                                return new PushResult(subscription, SUCCESS);
                            } else if (r.statusCode().value() == 410) {
                                System.out.println("Removing endpoint");
                                return new PushResult(subscription, ENDPOINT_NOT_REGISTRED);
                            } else {
                                throw new RuntimeException("Error when pushing");
                            }
                        }
                ).block();
    }
}
