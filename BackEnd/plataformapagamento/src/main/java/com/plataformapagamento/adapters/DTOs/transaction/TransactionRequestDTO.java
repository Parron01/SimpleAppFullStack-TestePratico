package com.plataformapagamento.adapters.DTOs.transaction;



import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;


public record TransactionRequestDTO(
        @NotNull(message = "Id do sender é necessário.")
        Long id_sender,
        @NotNull(message = "Id do receiver é necessário.")
        Long id_receiver,
        @NotNull(message = "Valor da transação é necessário.")
        BigDecimal value
) {


}
