package com.plataformapagamento.adapters.DTOs.transaction;

import com.plataformapagamento.domain.transaction.Transaction;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

public record TransactionResponseDTO(
        @Schema(description = "ID da transação")
        Long idTransaction,
        @Schema(description = "ID do remetente da transação")
        Long id_sender,
        @Schema(description = "ID do destinatário da transação")
        Long id_receiver,
        @Schema(description = "Valor da transação")
        BigDecimal value
) {
    public TransactionResponseDTO(Transaction transaction){
        this(
                transaction.getId(),
                transaction.getSender().getId(),
                transaction.getReceiver().getId(),
                transaction.getAmount());
    }
}
