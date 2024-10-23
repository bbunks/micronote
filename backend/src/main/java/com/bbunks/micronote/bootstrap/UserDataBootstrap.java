package com.bbunks.micronote.bootstrap;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.services.UserService;

@Component
public class UserDataBootstrap implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    Environment env;

    @Override
    public void run(String... args) {
        String[] activeProfiles = env.getActiveProfiles();

        if (userService.getCount() == 0 && Arrays.stream(activeProfiles).anyMatch("dev"::equals)) {
            User brenden = new User();
            brenden.setFirstName("Brenden");
            brenden.setLastName("Bunker");
            brenden.setEmail("brendenbunker@gmail.com");
            brenden.setPassword(encoder.encode("TestPassword"));
            userService.save(brenden);
        }
    }
}
