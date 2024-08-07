package com.plataformapagamento.adapters.DTOs.authentication;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponseDTO (
        @Schema(description = "Token de autenticação gerado após login")
        String token,
        Long userId

) {
}
