package pl.socha23.memba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Hooks;

@SpringBootApplication
public class MembaApplication {

    public static void main(String[] args) {
        // turn on reactive streams debug mode
        Hooks.onOperatorDebug();

        SpringApplication.run(MembaApplication.class, args);
    }


}
