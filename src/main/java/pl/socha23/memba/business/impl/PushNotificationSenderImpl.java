package pl.socha23.memba.business.impl;

import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.security.Security;

import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED;
import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.SUCCESS;

@Component
public class PushNotificationSenderImpl implements PushNotificationSender {


    private PushService pushService;
    WebClient webClient = WebClient.create();

    String vapidPublicKey;
    String vapidPrivateKey;

    public PushNotificationSenderImpl(@Value("${memba.push.vapidPublicKey}") String vapidPublicKey,
                                      @Value("${memba.push.vapidPrivateKey}") String vapidPrivateKey) {
        this.vapidPrivateKey = vapidPrivateKey;
        this.vapidPublicKey = vapidPublicKey;

        Security.addProvider(new BouncyCastleProvider());

        try {
            pushService = new PushService();
            pushService.setPublicKey(Utils.loadPublicKey(vapidPublicKey));
            pushService.setPrivateKey(Utils.loadPrivateKey(vapidPrivateKey));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Mono<PushResult> sendPushNotification(String endpoint) {

        //pushService.send()


        return webClient
                .post()
                .uri(endpoint)
                .contentLength(0)
                .header("TTL", "60")
                .header("Authorization", "key=" + serverKey)
                .exchange()
                .map(
                        r -> {
                            System.out.println("Push to " + endpoint + " with server key " + serverKey + " results in " + r.statusCode().toString());

                            if (r.statusCode().value() == 201) {
                                System.out.println("Push successfull");
                                return new PushResult(endpoint, SUCCESS);
                            } else if (r.statusCode().value() == 410) {
                                System.out.println("Removing endpoint");
                                return new PushResult(endpoint, ENDPOINT_NOT_REGISTRED);
                            } else {
                                throw new RuntimeException("Error when pushing");
                            }
                        }
                );
    }
}
