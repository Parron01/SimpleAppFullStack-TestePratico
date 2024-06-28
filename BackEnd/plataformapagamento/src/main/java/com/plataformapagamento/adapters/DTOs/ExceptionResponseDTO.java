package com.plataformapagamento.adapters.DTOs;

import io.swagger.v3.oas.annotations.media.Schema;

public record ExceptionResponseDTO(
        @Schema(description = "Mensagem de erro")
        String message,
        @Schema(description = "Código de status do erro")
        String statusCode
) {
}
