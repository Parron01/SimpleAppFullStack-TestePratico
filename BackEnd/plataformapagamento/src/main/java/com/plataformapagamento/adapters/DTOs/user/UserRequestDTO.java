package com.plataformapagamento.adapters.DTOs.user;

import com.plataformapagamento.domain.user.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UserRequestDTO(
        @Schema(description = "Primeiro nome do usuário", required = true)
        @NotBlank(message = "Nome é obrigatório.")
        String firstName,
        @Schema(description = "Sobrenome do usuário", required = true)
        @NotBlank(message = "Sobrenome é obrigatório.")
        String lastName,
        @Schema(description = "Número de documento do usuário", required = true)
        @NotBlank(message = "Número de documento é obrigatório.")
        String document,
        @Schema(description = "Email do usuário", required = true)
        @NotBlank(message = "Email é obrigatório.")
        String email,
        @Schema(description = "Senha do usuário", required = true)
        @NotBlank(message = "Senha é obrigatória.")
        String password,
        @Schema(description = "Saldo inicial do usuário", required = true)
        @NotNull(message = "Saldo é obrigatório.")
        BigDecimal balance,
        @Schema(description = "Tipo do usuário", required = true)
        @NotNull(message = "Tipo do usuário é obrigatório.")
        UserType userType
) {
}
