package com.example.dukane_pro.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String fullName;

    @Column(nullable = false, length = 15)
    private String phoneNumber;

    @Builder.Default
    private boolean verified = false;

    @Column(nullable = false)
    private String password;

    @Builder.Default
    private int failedAttempts = 0;

    private LocalDateTime accountLockedUntil;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
