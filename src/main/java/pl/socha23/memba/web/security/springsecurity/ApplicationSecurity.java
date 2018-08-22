package pl.socha23.memba.web.security.springsecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.Filter;

// rewrite web security to be reactive one day!

@EnableWebSecurity
@Order(1)
@Configuration
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    private AuthenticationManager authenticationManager;

    public ApplicationSecurity(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/api/**")
                .authorizeRequests()
                .anyRequest().hasRole("USER")
                .and()
                .addFilterBefore(tokenFilter(), BasicAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable() // we REST anyway
        ;

    }


    @Bean
    protected Filter tokenFilter() {
        var result = new PreAuthenticatedTokenFilter();
        result.setAuthenticationManager(authenticationManager);
        return result;
    }

}
