package com.example.backend.dto;

import com.example.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateResponse {
    private User user;
}
