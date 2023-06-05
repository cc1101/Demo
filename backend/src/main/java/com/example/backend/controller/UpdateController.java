package com.example.backend.controller;


import com.example.backend.dto.UpdateDTO;
import com.example.backend.dto.UpdateResponse;
import com.example.backend.model.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = {"Requestor-Type", "Authorization"})
@RequestMapping("/update")
public class UpdateController {
    @Autowired
    private UserService userService;

    @PostMapping
    public UpdateResponse signupUser(@RequestBody UpdateDTO updateDTO){
        User updatedUser = userService.updateUser(updateDTO);
        return new UpdateResponse(updatedUser);
    }
}
