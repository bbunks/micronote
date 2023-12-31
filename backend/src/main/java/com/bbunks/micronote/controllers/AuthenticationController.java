package com.bbunks.micronote.controllers;

import com.bbunks.micronote.dto.auth.AuthRequest;
import com.bbunks.micronote.dto.auth.UserInfo;
import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.security.JwtService;

import com.bbunks.micronote.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String refreshToken = jwtService.generateToken(authRequest.getUsername(), 60*24*7);
            response.setHeader("Set-Cookie", "REFRESH_TOKEN="+refreshToken+";HttpOnly;Secure;Path=/");
            return jwtService.generateToken(authRequest.getUsername(), 15);
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("/refreshToken")
    public String generateNewTokenForRefresh(@CookieValue("REFRESH_TOKEN") String refreshToken, HttpServletResponse res) {

        String username = jwtService.extractUsername(refreshToken);
        UserDetails user = userService.findByEmail(username);

        if (jwtService.validateToken(refreshToken, user)) {
            return jwtService.generateToken(username, 15);
        }

        res.setStatus(HttpStatus.FORBIDDEN.value());
        throw new UsernameNotFoundException("invalid user request!");
    }

    @PostMapping("/createUser")
    @Transactional
    public String addNewUser(@RequestBody UserInfo userInfo, HttpServletResponse response) {

        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        try {
            userService.addUser(userInfo);
        } catch (Exception e) {
            response.setStatus(HttpStatus.CONFLICT.value());
            return e.getMessage();
        }

        String refreshToken = jwtService.generateToken(userInfo.getEmail(), 60*24*7);
        response.setHeader("Set-Cookie", "REFRESH_TOKEN="+refreshToken+";HttpOnly;Secure;Path=/");
        return jwtService.generateToken(userInfo.getEmail(), 15);
    }
}
