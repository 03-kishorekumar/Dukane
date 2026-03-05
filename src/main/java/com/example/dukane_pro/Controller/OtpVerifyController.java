package com.example.dukane_pro.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.dukane_pro.Service.OtpVerificationService;
import com.example.dukane_pro.dto.OtpVerifyRequest;

@RestController
public class OtpVerifyController {

    @Autowired
    private OtpVerificationService otpVerificationService;

    @PostMapping("/api/auth/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerifyRequest req) {
        otpVerificationService.verifyOtp(req);
        return ResponseEntity.ok("OTP verified successfully");
    }
    
}
