package com.plataformapagamento.adapters.DTOs.user;

import com.plataformapagamento.domain.user.UserType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UserRequestDTO(
        @NotBlank(message = "Nome é obrigatório.")
        String firstName,
        @NotBlank(message = "Sobrenome é obrigatório.")
        String lastName,
        @NotBlank(message = "Número de documento é obrigatório.")
        String document,
        @NotBlank(message = "Email é obrigatório.")
        String email,
        @NotBlank(message = "Senha é obrigatória.")
        String password,
        @NotNull(message = "Saldo é obrigatório.")
        BigDecimal balance,
        @NotNull(message = "Tipo do usuário é obrigatorio.")
        UserType userType
) {

}
