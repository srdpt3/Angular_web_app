package com.dustin.youtube.controller;

import com.dustin.youtube.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/register")
    public String register(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        userService.registerUser(jwt.getTokenValue());
        return "User Registration Successfull";
    }

    @PostMapping("/subscribe/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean subscribeUser(@PathVariable String UserId) {
        userService.subscribeUser(UserId);
        return true;
    }

    @PostMapping("/unsubscribe/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean unSubscribeUser(@PathVariable String UserId) {
        userService.unSubscribeUser(UserId);
        return true;
    }

    @GetMapping("/{userId}/history}")
    @ResponseStatus(HttpStatus.OK)
    public Set<String> userHistory(@PathVariable String UserId) {
       return userService.userHistory(UserId);

    }

}
