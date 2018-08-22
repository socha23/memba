package pl.socha23.memba.web.security.springsecurity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@Order(2)
public class ActuatorSecurity extends WebSecurityConfigurerAdapter {

    @Value("${memba.security.admin.password:}")
    private String adminPassword = "";



    @Bean
    public UserDetailsService userDetailsService() {
        var users = User.withDefaultPasswordEncoder();
        var manager = new InMemoryUserDetailsManager();
        if (!adminPassword.equals("")) {
            manager.createUser(users.username("admin").password(adminPassword).roles("USER", "ADMIN").build());
        }

        return manager;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.requestMatcher(EndpointRequest.toAnyEndpoint()).authorizeRequests()
                .anyRequest().hasRole("ADMIN")
                .and().httpBasic();
    }

}
