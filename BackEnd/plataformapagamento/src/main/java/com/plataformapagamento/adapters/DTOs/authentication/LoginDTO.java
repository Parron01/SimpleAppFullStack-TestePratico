package com.plataformapagamento.adapters.DTOs.authentication;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record LoginDTO(
        @Schema(description = "Documento do usuário", required = true)
        @NotNull
        String document,
        @Schema(description = "Senha do usuário", required = true)
        @NotNull
        String password
) {
}
