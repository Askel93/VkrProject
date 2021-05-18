package com.example.auth.repository;

import com.example.auth.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Optional<Account> findByUserName(String userName);
    //Optional<Account> findByEmail(String email);
}
