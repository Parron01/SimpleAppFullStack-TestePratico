package com.plataformapagamento.adapters.services;


import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.adapters.repositories.TransactionRepository;
import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {
    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserService userService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private AuthorizationService authService;

    @Captor
    private ArgumentCaptor<Transaction> transactionArgumentCaptor;

    @Autowired
    @InjectMocks
    TransactionService transactionService;


    @Nested
    class createTransaction{

            private User sender;
            private User receiver;
            private TransactionRequestDTO request;

            @BeforeEach
            void setUp() {
                sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
                receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
                request = new TransactionRequestDTO(sender.getId(), receiver.getId(), new BigDecimal(50));
            }

            @Test
            @DisplayName("Should create transaction successfully")
            void shouldCreateTransactionSuccessfully() throws Exception {
                // Arrange
                when(userService.findUserById(sender.getId())).thenReturn(sender);
                when(userService.findUserById(receiver.getId())).thenReturn(receiver);
                doNothing().when(userService).ValidateTransaction(sender, request.value());
                when(authService.authorizeTransaction(sender, request.value())).thenReturn(true);

                when(transactionRepository.save(transactionArgumentCaptor.capture())).thenAnswer(invocation -> {
                    Transaction transactionToSave = invocation.getArgument(0);
                    transactionToSave.setId(1L); // Simula a atribuição de um ID pelo banco de dados
                    return transactionToSave;
                });

                // Act
                TransactionResponseDTO result = transactionService.createTransaction(request);

                // Assert
                assertNotNull(result);
                assertNotNull(result.idTransaction());
                assertEquals(request.value(), result.value());
                assertEquals(sender.getId(), result.id_sender());
                assertEquals(receiver.getId(), result.id_receiver());

                // Verificações específicas do ArgumentCaptor
                Transaction capturedTransaction = transactionArgumentCaptor.getValue();
                assertEquals(sender, capturedTransaction.getSender());
                assertEquals(receiver, capturedTransaction.getReceiver());
                assertEquals(request.value(), capturedTransaction.getAmount());

                // Verifica interações
                verify(transactionRepository, times(1)).save(any(Transaction.class));
                verify(userService, times(1)).findUserById(sender.getId());
                verify(userService, times(1)).findUserById(receiver.getId());
                verify(userService, times(1)).ValidateTransaction(sender, request.value());
                verify(authService, times(1)).authorizeTransaction(sender, request.value());
                verify(notificationService, times(1)).sendNotification(sender, "Transação realizada com sucesso!");
                verify(notificationService, times(1)).sendNotification(receiver, "Transação recebida com sucesso!");
            }

            @Test
            @DisplayName("Should throw exception when transaction is not authorized")
            void shouldThrowExceptionWhenTransactionNotAuthorized() throws Exception {
                // Arrange
                when(userService.findUserById(sender.getId())).thenReturn(sender);
                when(userService.findUserById(receiver.getId())).thenReturn(receiver);
                doNothing().when(userService).ValidateTransaction(sender, request.value());
                when(authService.authorizeTransaction(sender, request.value())).thenReturn(false);

                // Act and Assert
                Exception exception = assertThrows(Exception.class, () -> {
                    transactionService.createTransaction(request);
                });

                assertEquals("Transação não autorizada.", exception.getMessage());

                // Verificações de chamadas
                verify(userService, times(1)).findUserById(sender.getId());
                verify(userService, times(1)).findUserById(receiver.getId());
                verify(userService, times(1)).ValidateTransaction(sender, request.value());
                verify(authService, times(1)).authorizeTransaction(sender, request.value());

                // Verifica que o método save() não foi chamado
                verify(transactionRepository, never()).save(any(Transaction.class));

                // Verifica que as notificações não foram enviadas
                verify(notificationService, never()).sendNotification(any(User.class), anyString());
            }


    }
}