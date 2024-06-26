package com.plataformapagamento.adapters.DTOs.transaction;

import com.plataformapagamento.domain.transaction.Transaction;

import java.math.BigDecimal;

public record TransactionResponseDTO(
        Long idTransaction,
        Long id_sender,
        Long id_receiver,
        BigDecimal value) {
    public TransactionResponseDTO(Transaction transaction){
        this(
                transaction.getId(),
                transaction.getSender().getId(),
                transaction.getReceiver().getId(),
                transaction.getAmount());
    }
}
