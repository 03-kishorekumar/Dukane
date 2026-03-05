package com.example.dukane_pro.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dukane_pro.Service.LoginService;
import com.example.dukane_pro.Service.PasswordService;
import com.example.dukane_pro.dto.LoginResponse;
import com.example.dukane_pro.dto.SetPasswordRequest;
// import com.example.dukane_pro.Utils.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private LoginService loginService;

    // @Autowired
    // private JwtUtil jwtUtil;

    @PostMapping("/set-password")
    public ResponseEntity<?> setPassword(@RequestBody SetPasswordRequest req) {
        passwordService.setPassword(req);
        return ResponseEntity.ok("Password set successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody SetPasswordRequest req) {
        LoginResponse response = loginService.login(req);
        return ResponseEntity.ok(response);
    }


    // @PostMapping("/refresh")
    // public ResponseEntity<LoginResponse> refresh(@RequestBody LoginResponse req) {

    //     String email = jwtUtil.extractEmail(req.getRefreshToken());
    //     String role = jwtUtil.extractRole(req.getRefreshToken());

    //     String newAccessToken = jwtUtil.generateAccessToken(email, role);

    //     return ResponseEntity.ok(
    //         new LoginResponse(newAccessToken, req.getRefreshToken())
    //     );
    // }
    
}
