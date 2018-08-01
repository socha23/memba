package pl.socha23.memba.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.*;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    private AuthenticationManager authenticationManager;

    @Autowired 
    public SecurityConfiguration(AuthenticationManager authenticationManager) {
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
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }


    @Bean
    protected Filter tokenFilter() {
        var result = new PreAuthenticatedTokenFilter();
        result.setAuthenticationManager(authenticationManager);
        return result;
    }

}
