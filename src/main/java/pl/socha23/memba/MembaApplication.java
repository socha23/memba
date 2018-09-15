package pl.socha23.memba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import reactor.core.publisher.Hooks;

@EnableScheduling
@SpringBootApplication
public class MembaApplication {

    public static void main(String[] args) {
        // turn on reactive streams debug mode
        Hooks.onOperatorDebug();

        SpringApplication.run(MembaApplication.class, args);
    }


}
