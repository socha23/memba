package pl.socha23.memba.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.NotificationOperations;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.impl.PushNotificationSender;

import java.util.Collections;

@RestController
public class DevController {

    private NotificationOperations notificationOperations;
    private PushOperations pushOperations;

    public DevController(NotificationOperations pushOperations, PushOperations pushOperations1) {
        this.notificationOperations = pushOperations;
        this.pushOperations = pushOperations1;
    }

    @GetMapping("/dev/pushTodo/{todoId}")
    public PushResult push(@PathVariable("todoId") String todoId) {
        notificationOperations.pushTodo(todoId);
        return new PushResult();
    }

    static class PushResult {
        boolean isSuccess() {
            return true;
        }
    }

    @GetMapping("/dev/push/{userId}")
    public boolean push(@PathVariable("userId") String userId, @RequestParam("message") String message) {
        pushOperations.pushTo(userId, Collections.singletonMap("message", message == null ? "empty" : message ));
        return true;
    }
}

