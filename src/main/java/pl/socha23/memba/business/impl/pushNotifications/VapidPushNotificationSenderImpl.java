package pl.socha23.memba.business.impl.pushNotifications;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;
import org.apache.http.HttpResponse;
import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.bouncycastle.math.ec.ECPoint;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.PushSubscription;
import pl.socha23.memba.business.impl.PushNotificationSender;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.Security;
import java.util.Base64;

@Component
public class VapidPushNotificationSenderImpl implements PushNotificationSender {

    private ObjectMapper objectMapper = new ObjectMapper();
    private PushService pushService;

    public VapidPushNotificationSenderImpl(VapidProperties vapidProperties) throws Exception {

        Security.addProvider(new BouncyCastleProvider());

        pushService = new PushService();
        pushService.setPublicKey(Utils.loadPublicKey(vapidProperties.getVapidPublicKey()));
        pushService.setPrivateKey(Utils.loadPrivateKey(vapidProperties.getVapidPrivateKey()));

        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }

    @Override
    public PushResult sendPushNotification(PushSubscription subscription, Object payload) {
        var notification = createNotification(subscription, payload);
        var response = doSendNotification(notification);

        var statusCode = response.getStatusLine().getStatusCode();
        switch (statusCode) {

            case 200:
            case 201:
                return PushResult.success(subscription);
            case 410:
                return PushResult.endpointNotRegistered(subscription);
            default:
                return PushResult.error(subscription);
        }
    }

    private Notification createNotification(PushSubscription subscription, Object payload) {

        PublicKey key = getPublicKey(subscription);
        byte[] authBytes = Base64.getDecoder().decode(subscription.getAuth());

        return new Notification(
                subscription.getEndpoint(),
                key,
                authBytes,
                getNotificationPayload(payload),
                3600
        );
    }

    private HttpResponse doSendNotification(Notification notification) {
        try {
            return pushService.send(notification);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private byte[] getNotificationPayload(Object payload) {
        try {
            return objectMapper.writeValueAsBytes(payload);
        } catch (JsonProcessingException jpe) {
            throw new RuntimeException(jpe);
        }

    }

    private PublicKey getPublicKey(PushSubscription subscription) {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(subscription.getKey());
            KeyFactory kf = KeyFactory.getInstance("ECDH", BouncyCastleProvider.PROVIDER_NAME);
            ECNamedCurveParameterSpec ecSpec = ECNamedCurveTable.getParameterSpec("secp256r1");
            ECPoint point = ecSpec.getCurve().decodePoint(keyBytes);
            ECPublicKeySpec pubSpec = new ECPublicKeySpec(point, ecSpec);
            return kf.generatePublic(pubSpec);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
