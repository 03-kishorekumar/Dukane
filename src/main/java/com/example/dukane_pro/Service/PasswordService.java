package com.example.dukane_pro.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.dukane_pro.Repository.AdminRepository;
import com.example.dukane_pro.Repository.EmployeeRepository;
import com.example.dukane_pro.dto.SetPasswordRequest;

@Service
public class PasswordService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public class PasswordUtil {
        public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])(?!.*\\s).{8,}$";
    }

    public void setPassword(SetPasswordRequest req) {

        if (!req.getPassword().matches(PasswordUtil.PASSWORD_REGEX)) {
            throw new RuntimeException("Password does not meet security rules");
        }
        
        adminRepository.findByEmail(req.getEmail())
            .ifPresentOrElse(admin -> {
                if (!admin.isVerified())
                    throw new RuntimeException("Email not verified");

                admin.setPassword(passwordEncoder.encode(req.getPassword()));
                adminRepository.save(admin);
            }, () -> {
                employeeRepository.findByEmail(req.getEmail())
                    .ifPresentOrElse(emp -> {
                        if (!emp.isVerified())
                            throw new RuntimeException("Email not verified");

                        emp.setPassword(passwordEncoder.encode(req.getPassword()));
                        employeeRepository.save(emp);
                    }, () -> {
                        throw new RuntimeException("Email not registered");
                    });
            });
    }
}
