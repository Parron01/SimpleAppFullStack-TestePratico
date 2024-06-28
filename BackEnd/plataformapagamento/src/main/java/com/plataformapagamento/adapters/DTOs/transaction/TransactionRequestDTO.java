package com.plataformapagamento.adapters.DTOs.transaction;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TransactionRequestDTO(
        @Schema(description = "ID do remetente da transação", required = true)
        @NotNull(message = "Id do sender é necessário.")
        Long id_sender,
        @Schema(description = "ID do destinatário da transação", required = true)
        @NotNull(message = "Id do receiver é necessário.")
        Long id_receiver,
        @Schema(description = "Valor da transação", required = true)
        @NotNull(message = "Valor da transação é necessário.")
        BigDecimal value
) {
}
