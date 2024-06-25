package com.plataformapagamento.adapters.DTOs.authentication;

import jakarta.validation.constraints.NotNull;

public record LoginDTO(
        @NotNull
        String document,
        @NotNull
        String password
) {
}
