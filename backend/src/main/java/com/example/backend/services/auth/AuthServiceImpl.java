package com.example.backend.services.auth;

import com.example.backend.dto.SignupDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setUsername(signupDTO.getUsername());
        user.setEmail(signupDTO.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        user.setGender(signupDTO.getGender());
        user.setCompany(signupDTO.getCompany());
        user.setFirstName(signupDTO.getFirstname());
        user.setLastName(signupDTO.getLastname());
        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setUsername(createdUser.getUsername());
        userDTO.setGender(createdUser.getGender());
        userDTO.setLastname(createdUser.getLastName());
        userDTO.setCompany(createdUser.getCompany());
        userDTO.setFirstname(createdUser.getFirstName());
        return userDTO;
    }
}
