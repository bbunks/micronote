package com.bbunks.micronote.services;

import com.bbunks.micronote.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    User findByEmail(String email);

    User save(User user);

    Long getCount();

}
