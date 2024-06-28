package com.plataformapagamento.adapters.DTOs;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record DeleteDTO(
        @Schema(description = "ID a ser deletado", required = true)
        @NotNull
        Long id
) {

}