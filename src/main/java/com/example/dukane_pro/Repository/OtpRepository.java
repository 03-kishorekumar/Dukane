package com.example.dukane_pro.Repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dukane_pro.Model.Otp;
import java.util.Optional;
@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByTokenAndUsedFalse(String token);
    
}
