package pl.socha23.memba.sample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 *
 */
@RestController
public class Controller {

    @GetMapping("/hello")
    public String hello(Principal user) {

        return "hello " + user.toString();

    }

}
