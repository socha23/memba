package pl.socha23.memba.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.PushOperations;
import reactor.core.publisher.Mono;

@RestController
public class DevController {

    private PushOperations pushOperations;

    public DevController(PushOperations pushOperations) {
        this.pushOperations = pushOperations;
    }

    @GetMapping("/dev/push/{userId}")
    public Mono<Boolean> push(@PathVariable("userId") String userId) {
        return pushOperations.pushTo(userId).thenReturn(true);
    }
}

