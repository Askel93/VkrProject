package com.example.auth.repository;

import com.example.auth.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    Optional<Account> findByUserName(String userName);
    @Modifying
    @Transactional
    @Query("update Account u set u.userName = :userName, u.email = :email where u.userName = :prevName")
    void update(@Param("userName") String userName, @Param("email") String email, @Param("prevName") String prevName);
}
