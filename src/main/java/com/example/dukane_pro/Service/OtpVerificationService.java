package com.example.dukane_pro.Service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dukane_pro.Model.Otp;
import com.example.dukane_pro.Repository.AdminRepository;
import com.example.dukane_pro.Repository.EmployeeRepository;
import com.example.dukane_pro.Repository.OtpRepository;
import com.example.dukane_pro.dto.OtpVerifyRequest;

@Service
public class OtpVerificationService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

     public void verifyOtp(OtpVerifyRequest req) {

        Otp otp = otpRepository.findByTokenAndUsedFalse(req.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (otp.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP expired");

        if (!otp.getOtp().equals(req.getOtp()))
            throw new RuntimeException("Invalid OTP");

        otp.setUsed(true);
        otpRepository.save(otp);

        adminRepository.findByEmail(otp.getEmail())
                .ifPresent(a -> { a.setVerified(true); adminRepository.save(a); });

        employeeRepository.findByEmail(otp.getEmail())
                .ifPresent(e -> { e.setVerified(true); employeeRepository.save(e); });
    }


    
}
