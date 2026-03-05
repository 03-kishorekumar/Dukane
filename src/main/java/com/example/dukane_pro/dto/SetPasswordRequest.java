package com.example.dukane_pro.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class SetPasswordRequest {

    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
    
}
