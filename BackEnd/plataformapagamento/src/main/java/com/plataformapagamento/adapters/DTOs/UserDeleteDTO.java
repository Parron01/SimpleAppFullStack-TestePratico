package com.plataformapagamento.adapters.DTOs;

import jakarta.validation.constraints.NotNull;

public record UserDeleteDTO(
        @NotNull
        Long id
) {
}
