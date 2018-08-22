package pl.socha23.memba.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import reactor.core.publisher.Mono;

import java.util.Random;

@Controller
public class IndexController {

    private Random random = new Random();
    private String googleClientId;

    public IndexController(@Value("${memba.security.google.client_id}") String googleClientId) {
        this.googleClientId = googleClientId;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @ModelAttribute("googleClientId")
    public String getGoogleClientId() {
        return googleClientId;
    }

    @ModelAttribute("cachebuster")
    public String getCachebuster() {
        return "" + random.nextInt();
    }

}

