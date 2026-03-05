package com.example.dukane_pro.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpVerifyRequest {

    private String token;
    private String otp;
    
}
