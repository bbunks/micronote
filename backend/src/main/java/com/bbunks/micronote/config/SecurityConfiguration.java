package com.bbunks.micronote.config;

import com.bbunks.micronote.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests((configurer) ->
                        configurer
                                .requestMatchers(HttpMethod.GET, "/api")
                                .hasRole("USER")
                                .requestMatchers(HttpMethod.PUT, "/api")
                                .hasRole("USER")
                                .requestMatchers(HttpMethod.POST, "/api")
                                .hasRole("USER")
                                .requestMatchers(HttpMethod.DELETE, "/api")
                                .hasRole("USER")

                )
                .httpBasic(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .build();

               // .authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint());
    }

//    @Bean
//    public InMemoryUserDetailsManager userDetailsManager() {
//
//        UserDetails brenden = User.builder()
//                .username("brenden")
//                .password("{noop}test123")
//                .build();
//
//        return new InMemoryUserDetailsManager(brenden);
//    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService); //set the custom user details service
        auth.setPasswordEncoder(passwordEncoder()); //set the password encoder - bcrypt
        return auth;
    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);

//        manager.setAuthenticationManager();

        return manager;
    }

}