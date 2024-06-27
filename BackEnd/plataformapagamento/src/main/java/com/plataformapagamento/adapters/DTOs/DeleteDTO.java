package com.plataformapagamento.adapters.DTOs;

import jakarta.validation.constraints.NotNull;

public record DeleteDTO(
        @NotNull
        Long id
) {
}
