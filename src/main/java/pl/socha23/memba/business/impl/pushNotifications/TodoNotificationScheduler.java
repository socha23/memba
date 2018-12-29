package pl.socha23.memba.business.impl.pushNotifications;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.NotificationOperations;

import java.time.Instant;

@Component
public class TodoNotificationScheduler {

    private NotificationOperations notificationOperations;

    private Instant lastTime = Instant.now();

    public TodoNotificationScheduler(NotificationOperations notificationOperations) {
        this.notificationOperations = notificationOperations;
    }

    @Scheduled(fixedRate = 60 * 1000)
    public void run() {
        run(Instant.now());
    }

    public void run(Instant currentTime) {
        notificationOperations.sendNotifications(currentTime, lastTime, currentTime);
        lastTime = currentTime;
    }

}
