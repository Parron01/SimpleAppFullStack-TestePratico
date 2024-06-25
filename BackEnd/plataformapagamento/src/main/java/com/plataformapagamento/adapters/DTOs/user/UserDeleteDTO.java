package com.plataformapagamento.adapters.DTOs.user;

import jakarta.validation.constraints.NotNull;

public record UserDeleteDTO(
        @NotNull
        Long id
) {
}
