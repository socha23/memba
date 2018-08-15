package pl.socha23.memba.dao.mongo.migga;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MigrationsStartupListener {

    private MigrationsRunner runner;


    public MigrationsStartupListener(MigrationsRunner runner) {
        this.runner = runner;
    }

    @EventListener
    public void runOnStartup(ContextRefreshedEvent event) {
        runner.runMigrations(null);
    }
}
