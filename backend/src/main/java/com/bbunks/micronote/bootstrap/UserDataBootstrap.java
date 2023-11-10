package com.bbunks.micronote.bootstrap;

import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataBootstrap implements CommandLineRunner {
    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) {
        if (userService.getCount() == 0) {
            User brenden = new User();
            brenden.setFirstName("Brenden");
            brenden.setLastName("Bunker");
            brenden.setEmail("brendenbunker@gmail.com");
            brenden.setPassword("$2y$10$rpldcsKqDy3SFoJOISKbr.Z9dBw/KBDIi0r.4bR71DQytiLtjkj8q");
            userService.save(brenden);
        }
    }
}
