package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.dto.auth.UserInfo;
import com.bbunks.micronote.entities.Role;
import com.bbunks.micronote.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("invalid email or password"));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Long getCount() {
        return userRepository.count();
    }

    public User addUser(UserInfo userInfo) {

        User existingUser =
                userRepository
                        .findByEmail(userInfo.getEmail()).orElse(null);

        if (existingUser != null) {
            throw new RuntimeException("An account with that email already exists");
        }

        User user = new User();

        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setEmail(userInfo.getEmail());
        user.setPassword(userInfo.getPassword());
        
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = findByEmail(userName);

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles())
        );
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
        return roles.stream().map(role -> new
                SimpleGrantedAuthority(role.getTitle())).collect(Collectors.toList());

    }
}
