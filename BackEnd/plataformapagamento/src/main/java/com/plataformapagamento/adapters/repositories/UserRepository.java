package com.plataformapagamento.adapters.repositories;

import com.plataformapagamento.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserById(Long id);
    User findUserByDocument(String document);
    @Query("SELECT u FROM users u WHERE u.document = :document")
    Optional<User> findUserEntityByDocument(@Param("document") String document);
}
