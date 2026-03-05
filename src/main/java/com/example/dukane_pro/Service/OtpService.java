package com.example.dukane_pro.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.example.dukane_pro.Model.Otp;
import com.example.dukane_pro.Repository.OtpRepository;
import org.springframework.beans.factory.annotation.Value;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail.from.address}")
    private String fromAddress;

    @Value("${mail.from.name}")
    private String fromName;

    public String generateAndSendOtp(String email) {

        String otp = String.valueOf(100000 + new SecureRandom().nextInt(900000));
        String token = UUID.randomUUID().toString();

        Otp otpEntity = Otp.builder()
                .email(email)
                .otp(otp)
                .token(token)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .build();

        otpRepository.save(otpEntity);

        sendEmail(email, otp);

        return token;
    }

    private void sendEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(to);
        message.setSubject("Your OTP Verification Code");
        message.setText("Your OTP is: " + otp + 
        "\n This OTP is Valid for 5 minutes." + 
        "\n Do not share this code with anyone.");

        mailSender.send(message);
    }
}
