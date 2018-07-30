package pl.socha23.memba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MembaApplication {

    public static void main(String[] args) {

        var x = 3;
        
        SpringApplication.run(MembaApplication.class, args);
    }
}
