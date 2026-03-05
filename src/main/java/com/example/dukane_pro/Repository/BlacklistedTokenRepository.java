package com.example.dukane_pro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dukane_pro.Model.BlacklistedToken;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long>  {


    boolean existsById(String id);
    
}
