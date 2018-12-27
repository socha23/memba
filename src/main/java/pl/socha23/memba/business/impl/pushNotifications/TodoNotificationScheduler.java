package pl.socha23.memba.business.impl.pushNotifications;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.NotificationOperations;
import pl.socha23.memba.business.api.logic.TodosNeedingNotificationProvider;

import java.time.Instant;

@Component
public class TodoNotificationScheduler {

    private NotificationOperations notificationOperations;
    private TodosNeedingNotificationProvider provider;

    private Instant lastTime = Instant.now();

    public TodoNotificationScheduler(NotificationOperations notificationOperations, TodosNeedingNotificationProvider provider) {
        this.notificationOperations = notificationOperations;
        this.provider = provider;
    }

    @Scheduled(fixedRate = 60 * 1000)
    public void run() {
        run(Instant.now());
    }

    public void run(Instant currentTime) {
        var todos = provider.listTodosRequiringNotificationInPeriod(lastTime, currentTime);
        for (var todo : todos) {
            notificationOperations.sendNotificationForTodo(todo, currentTime, lastTime, currentTime);
        }
        lastTime = currentTime;
    }

}
