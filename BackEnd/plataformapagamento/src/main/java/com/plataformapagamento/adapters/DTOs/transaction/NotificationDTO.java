package com.plataformapagamento.adapters.DTOs.transaction;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record NotificationDTO(
        @Schema(description = "Email para notificação", required = true)
        @NotBlank(message = "Email é obrigatório.")
        String email,
        @Schema(description = "Mensagem da notificação", required = true)
        @NotBlank(message = "Mensagem é obrigatória.")
        String message
) {
}
