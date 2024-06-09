package com.plataformapagamento.repositories;

import com.plataformapagamento.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserById(String id);
    Optional<User> findUserByDocument(String document);
}
