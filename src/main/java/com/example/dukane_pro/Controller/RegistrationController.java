package com.example.dukane_pro.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dukane_pro.Service.RegistrationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.dukane_pro.dto.Registration;
import com.example.dukane_pro.dto.RegistrationTokenResponse;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/admin")
    public RegistrationTokenResponse registerAdmin(@RequestBody Registration req) {
        System.out.println("Received registration request for admin: " + req);
        return registrationService.registerAdmin(req);
    }

    @PostMapping("/employee")
    public RegistrationTokenResponse registerEmployee(@RequestBody Registration req) {
        return registrationService.registerEmployee(req);
    }
    
}
