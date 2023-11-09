package com.bbunks.micronote.bootstrap;

import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataBootstrap implements CommandLineRunner {

    private UserService userService;

    @Autowired
    public UserDataBootstrap(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        if (userService.getCount() == 0) {
            User brenden = new User();
            brenden.setFirstName("Brenden");
            brenden.setLastName("Bunker");
            brenden.setEmail("brendenbunker@gmail.com");
            brenden.setPassword("{bcrypt}$2y$06$LrRvvzRloxheI95p5TyOTeig1WvixHt/smvHcrzAn6OuaYkX25eh.");
            userService.save(brenden);
        }
    }
}
