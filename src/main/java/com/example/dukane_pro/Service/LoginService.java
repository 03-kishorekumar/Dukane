package com.example.dukane_pro.Service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.dukane_pro.dto.LoginResponse;
import com.example.dukane_pro.Model.Admin;
import com.example.dukane_pro.Model.BlacklistedToken;
import com.example.dukane_pro.Model.Employee;
import com.example.dukane_pro.Repository.AdminRepository;
import com.example.dukane_pro.Repository.BlacklistedTokenRepository;
import com.example.dukane_pro.Repository.EmployeeRepository;
import com.example.dukane_pro.Utils.JwtUtil;
import com.example.dukane_pro.dto.SetPasswordRequest;

@Service
public class LoginService {

    // @Autowired
    // private BlacklistedTokenRepository blacklistedTokenRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(SetPasswordRequest req) {

        return adminRepository.findByEmail(req.getEmail())
                .map(admin -> authenticate(admin, "ADMIN", req))
                .orElseGet(() -> employeeRepository.findByEmail(req.getEmail())
                        .map(emp -> authenticate(emp, "EMPLOYEE", req))
                        .orElseThrow(() -> new RuntimeException("Email not registered")));
    }

    private LoginResponse authenticate(Object user, String role, SetPasswordRequest req) {

        String password;
        boolean verified;
        int attempts;
        LocalDateTime lockedUntil;

        if (user instanceof Admin a) {
            password = a.getPassword();
            verified = a.isVerified();
            attempts = a.getFailedAttempts();
            lockedUntil = a.getAccountLockedUntil();
        } else {
            Employee e = (Employee) user;
            password = e.getPassword();
            verified = e.isVerified();
            attempts = e.getFailedAttempts();
            lockedUntil = e.getAccountLockedUntil();
        }

        if (!verified)
            throw new RuntimeException("Email not verified");

        if (lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now()))
            throw new RuntimeException("Account locked. Try later.");

        if (!passwordEncoder.matches(req.getPassword(), password)) {
            handleFailedAttempt(user);
            throw new RuntimeException("Invalid credentials");
        }

        resetAttempts(user);

        return new LoginResponse(
                jwtUtil.generateAccessToken(req.getEmail(), role),
                jwtUtil.generateRefreshToken(req.getEmail(), role));

    }

    private void handleFailedAttempt(Object user) {
        if (user instanceof Admin a) {
            a.setFailedAttempts(a.getFailedAttempts() + 1);
            if (a.getFailedAttempts() >= 5)
                a.setAccountLockedUntil(LocalDateTime.now().plusMinutes(15));
            adminRepository.save(a);
        } else {
            Employee e = (Employee) user;
            e.setFailedAttempts(e.getFailedAttempts() + 1);
            if (e.getFailedAttempts() >= 5)
                e.setAccountLockedUntil(LocalDateTime.now().plusMinutes(15));
            employeeRepository.save(e);
        }
    }

    private void resetAttempts(Object user) {
        if (user instanceof Admin a) {
            a.setFailedAttempts(0);
            a.setAccountLockedUntil(null);
            adminRepository.save(a);
        } else {
            Employee e = (Employee) user;
            e.setFailedAttempts(0);
            e.setAccountLockedUntil(null);
            employeeRepository.save(e);
        }
    }

    // public void logout(String token) {
    //     blacklistedTokenRepository.save(new BlacklistedToken(token, LocalDateTime.now().plusMinutes(15)));
    // }

}
