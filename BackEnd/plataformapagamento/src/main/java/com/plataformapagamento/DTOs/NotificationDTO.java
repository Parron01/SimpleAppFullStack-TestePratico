package com.plataformapagamento.DTOs;

import jakarta.validation.constraints.NotBlank;

public record NotificationDTO(
        @NotBlank(message = "Email é obrigatório.")
        String email,
        @NotBlank(message = "Mensagem é obrigatória.")
        String message
        ) {
}
