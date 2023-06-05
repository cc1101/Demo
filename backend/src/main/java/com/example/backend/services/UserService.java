package com.example.backend.services;

import com.example.backend.dto.UpdateDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User updateUser(UpdateDTO updateDTO){
        User user= userRepository.findFirstByUsername(updateDTO.getUsername());
        if(user == null) {
            throw new RuntimeException("User not found");
        }
        user.setFirstName(updateDTO.getFirstname());
        user.setLastName(updateDTO.getLastname());
        user.setEmail(updateDTO.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(updateDTO.getPassword()));
        user.setGender(updateDTO.getGender());
        user.setCompany(updateDTO.getCompany());
        userRepository.save(user);
        return user;
    }
}
