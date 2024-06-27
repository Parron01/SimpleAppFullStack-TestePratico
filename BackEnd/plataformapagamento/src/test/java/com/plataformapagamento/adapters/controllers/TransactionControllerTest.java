package com.plataformapagamento.adapters.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.adapters.services.TransactionService;
import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TransactionControllerTest {

    @InjectMocks
    private TransactionController transactionController;

    @Mock
    private TransactionService transactionService;

    private MockMvc mockMvc;
    private TransactionResponseDTO transactionResponseDTO;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController)
                .alwaysDo(print())
                .build();

        User sender = new User(1L, "John", "Doe", "123456789", "john.doe@example.com",
                "password", BigDecimal.valueOf(1000), UserType.COMUM);
        User receiver = new User(2L, "Jane", "Doe", "987654321", "jane.doe@example.com",
                "password", BigDecimal.valueOf(2000), UserType.COMUM);
        Transaction transaction = new Transaction(1L, BigDecimal.valueOf(500), sender, receiver, LocalDateTime.now());

        transactionResponseDTO = new TransactionResponseDTO(transaction);

        objectMapper = new ObjectMapper();
    }

    @Nested
    public class CreateTransaction {
        @Test
        void shouldCreateTransactionSuccessfully() throws Exception {
            // Arrange
            TransactionRequestDTO transactionRequestDTO = new TransactionRequestDTO(1L, 2L, BigDecimal.valueOf(500));
            when(transactionService.createTransaction(any(TransactionRequestDTO.class))).thenReturn(transactionResponseDTO);

            // Act & Assert
            mockMvc.perform(post("/transaction/create")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(transactionRequestDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(content().json(objectMapper.writeValueAsString(transactionResponseDTO)));

            verify(transactionService, times(1)).createTransaction(any(TransactionRequestDTO.class));
            verifyNoMoreInteractions(transactionService);
        }
    }

    @Nested
    public class ListTransactions {
        @Test
        void shouldReturnListOfTransactions() throws Exception {
            // Arrange
            when(transactionService.getAllTransactions()).thenReturn(Collections.singletonList(transactionResponseDTO));

            // Act & Assert
            mockMvc.perform(get("/transaction")
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().json(objectMapper.writeValueAsString(Collections.singletonList(transactionResponseDTO))));

            verify(transactionService, times(1)).getAllTransactions();
            verifyNoMoreInteractions(transactionService);
        }
    }

    @Nested
    public class DeleteTransaction {
        @Test
        void shouldDeleteTransactionSuccessfully() throws Exception {
            // Arrange
            DeleteDTO deleteDTO = new DeleteDTO(1L);

            // Act & Assert
            mockMvc.perform(delete("/transaction/delete")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(deleteDTO)))
                    .andExpect(status().isAccepted());

            verify(transactionService, times(1)).deleteTransactionById(anyLong());
            verifyNoMoreInteractions(transactionService);
        }
    }
}