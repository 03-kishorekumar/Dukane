package com.example.dukane_pro.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dukane_pro.Model.Admin;
import com.example.dukane_pro.Model.Employee;
import com.example.dukane_pro.Repository.AdminRepository;
import com.example.dukane_pro.Repository.EmployeeRepository;
import com.example.dukane_pro.dto.Registration;
import com.example.dukane_pro.dto.RegistrationTokenResponse;

@Service
public class RegistrationService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OtpService otpService;

    public RegistrationTokenResponse registerAdmin(Registration req) {

        if (adminRepository.findByEmail(req.getEmail()).isPresent())
            throw new RuntimeException("Admin already exists");

        Admin admin = Admin.builder()
                .email(req.getEmail())
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .build();

        adminRepository.save(admin);

        String token = otpService.generateAndSendOtp(req.getEmail());

        return new RegistrationTokenResponse(token);
    }

    public RegistrationTokenResponse registerEmployee(Registration req) {

        if (employeeRepository.findByEmail(req.getEmail()).isPresent())
            throw new RuntimeException("Employee already exists");

        Employee employee = Employee.builder()
                .email(req.getEmail())
                .fullName(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .build();

        employeeRepository.save(employee);

        String token = otpService.generateAndSendOtp(req.getEmail());

        return new RegistrationTokenResponse(token);
    }
    
}
