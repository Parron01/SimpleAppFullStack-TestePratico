package com.plataformapagamento.adapters.DTOs.user;

import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;

import java.math.BigDecimal;

public record UserResponseDTO(
        Long id,
        String firstName,
        String lastName,
        String document,
        String email,
        String password,
        BigDecimal balance,
        UserType userType
) {
    public UserResponseDTO(User user){
    this(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getDocument(),
            user.getEmail(),
            user.getPassword(),
            user.getBalance(),
            user.getUserType()
            );
    }
}
