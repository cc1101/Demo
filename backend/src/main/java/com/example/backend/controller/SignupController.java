package com.example.backend.controller;

import com.example.backend.dto.SignupDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.services.EmailService;
import com.example.backend.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SignupController {
    @Autowired
    private AuthService authService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO){
        UserDTO createdUser = authService.createUser(signupDTO);
        if (createdUser == null){
            return new ResponseEntity<>("Create User failed", HttpStatus.BAD_REQUEST);
        }
        String subject = "Registration Confirmation";
        String content = "Welcome to our application, " + createdUser.getUsername() + "!"; // You can customize your message here.

        emailService.sendConfirmationEmail(createdUser.getEmail(), subject, content);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
