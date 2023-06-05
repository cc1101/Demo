package com.example.backend.dto;

import lombok.Data;

@Data
public class UpdateDTO {
    private String username;
    private String email;
    private String password;
    private String lastname;
    private String gender;
    private String firstname;
    private String company;
}
