package pl.socha23.memba.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.PushOperations;

import java.util.Collections;

@RestController
public class DevController {

    private PushOperations pushOperations;

    public DevController(PushOperations pushOperations) {
        this.pushOperations = pushOperations;
    }

    @GetMapping("/dev/push/{userId}")
    public boolean push(@PathVariable("userId") String userId, @RequestParam("message") String message) {
        pushOperations.pushTo(userId, Collections.singletonMap("message", message == null ? "empty" : message ));
        return true;
    }
}

