package com.example.account.repository;

import com.example.account.model.Account;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@SuppressWarnings("NullableProblems")
@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
    @Cacheable(value = "users", key = "#name")
    Optional<Account> findByName(String name);

    @Cacheable(value = "usersEmail", key = "#email")
    Optional<Account> findByEmail(String email);

    @Override
    @Caching(
        put = {
            @CachePut(value = "users", key = "#user.name"),
            @CachePut(value = "usersEmail", key = "#user.email")
        }
    )
    <S extends Account> S save(S user);

    @CacheEvict(value = { "users", "usersEmail"}, allEntries = true)
    @Modifying
    @Transactional
    @Query("update Account u " +
        "set u.name = :name, " +
        "u.email = :email, " +
        "u.firstName = :firstName, " +
        "u.secondName = :secondName, " +
        "u.updatedAt = :updatedAt " +
        "where u.name = :prevName")
    void update(@Param("name") String name, @Param("email") String email,
                @Param("firstName") String firstName, @Param("secondName") String secondName,
                @Param("updatedAt") Instant updatedAt, @Param("prevName") String prevName);
}
