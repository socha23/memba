package pl.socha23.memba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@SpringBootApplication
public class MembaApplication {

    public static void main(String[] args) {

        var x = 3;
        
        SpringApplication.run(MembaApplication.class, args);
    }


}
