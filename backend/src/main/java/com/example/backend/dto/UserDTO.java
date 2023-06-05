package com.example.backend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String lastname;
    private String gender;
    private String firstname;
    private String company;
}
