package com.plataformapagamento.adapters.DTOs.user;

import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

public record UserResponseDTO(
        @Schema(description = "ID do usuário")
        Long id,
        @Schema(description = "Primeiro nome do usuário")
        String firstName,
        @Schema(description = "Sobrenome do usuário")
        String lastName,
        @Schema(description = "Número de documento do usuário")
        String document,
        @Schema(description = "Email do usuário")
        String email,
        @Schema(description = "Senha do usuário")
        String password,
        @Schema(description = "Saldo do usuário")
        BigDecimal balance,
        @Schema(description = "Tipo do usuário")
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
