package com.plataformapagamento.adapters.services;


import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.adapters.repositories.TransactionRepository;
import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import com.plataformapagamento.infra.exceptions.TransactionNotFoundException;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Captor
    private ArgumentCaptor<User> userArgumentCaptor;

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

    @Nested
    class getAllTransactions{

        private User sender;
        private User receiver;

        @BeforeEach
        void setUp() {
            sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
            receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
        }


        @Test
        @DisplayName("Should get all transactions successfully")
        void shouldGetAllTransactionsSuccessfully() throws Exception {
            // Arrange
            Transaction transaction1 = new Transaction(sender, receiver, new BigDecimal(50));
            Transaction transaction2 = new Transaction(sender, receiver, new BigDecimal(30));

            List<Transaction> transactionList = new ArrayList<>();
            transactionList.add(transaction1);
            transactionList.add(transaction2);

            when(transactionRepository.findAll()).thenReturn(transactionList);

            // Act
            List<TransactionResponseDTO> result = transactionService.getAllTransactions();

            // Assert
            assertNotNull(result);
            assertEquals(2, result.size());

            List<TransactionResponseDTO> transactionResponseDTOList = transactionList.stream()
                    .map(TransactionResponseDTO::new)
                    .toList();

            assertEquals(transactionResponseDTOList, result);

            // Verifica interações
            verify(transactionRepository, times(1)).findAll();

        }
    }

    @Nested
    class saveNewTransaction{

        private User sender;
        private User receiver;

        @BeforeEach
        void setUp() {
            sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
            receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
        }

        @Test
        @DisplayName("Should save new transaction with data sent successfully")
        void shouldSaveNewTransactionWithDataSentSuccessfully() {
            // Arrange
            BigDecimal amount = new BigDecimal("50.00");
            Transaction expectedTransaction = new Transaction(sender, receiver, amount);

            // Mock do save do TransactionRepository
            when(transactionRepository.save(transactionArgumentCaptor.capture())).thenReturn(expectedTransaction);

            // Act
            Transaction savedTransaction = transactionService.saveNewTransaction(sender, receiver, amount);

            // Assert
            assertNotNull(savedTransaction);
            assertEquals(expectedTransaction, savedTransaction);

            // Verifica se o método save foi chamado exatamente uma vez
            verify(transactionRepository, times(1)).save(any(Transaction.class));

            Transaction capturedTransaction = transactionArgumentCaptor.getValue();
            assertEquals(expectedTransaction.getSender(), capturedTransaction.getSender());
            assertEquals(expectedTransaction.getReceiver(), capturedTransaction.getReceiver());
            assertEquals(expectedTransaction.getAmount(), capturedTransaction.getAmount());
        }
    }

    @Nested
    class updateUsersBalances {

        private User sender;
        private User receiver;

        @BeforeEach
        void setUp() {
            sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
            receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
        }

        @Test
        @DisplayName("Should update balances correctly")
        void shouldUpdateBalancesCorrectly() {
            // Arrange
            BigDecimal amount = new BigDecimal("50.00");
            BigDecimal senderInitialBalance = sender.getBalance();
            BigDecimal receiverInitialBalance = receiver.getBalance();

            // Act
            transactionService.updateUsersBalances(sender, receiver, amount);

            // Assert
            assertEquals(senderInitialBalance.subtract(amount), sender.getBalance());
            assertEquals(receiverInitialBalance.add(amount), receiver.getBalance());

            // Verifica se o método saveUser foi chamado duas vezes, uma para cada usuário
            verify(userService, times(2)).saveUser(userArgumentCaptor.capture());
            assertEquals(sender, userArgumentCaptor.getAllValues().get(0));
            assertEquals(receiver, userArgumentCaptor.getAllValues().get(1));
        }
    }

    @Nested
    class findById {

        private User sender;
        private User receiver;

        @BeforeEach
        void setUp() {
            sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
            receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
        }

        @Test
        @DisplayName("Should find transaction by ID")
        void shouldFindTransactionById() throws TransactionNotFoundException {
            // Arrange
            Long transactionId = 1L;
            Transaction mockTransaction = new Transaction(transactionId, new BigDecimal("50.00"),sender, receiver, LocalDateTime.now());

            // Mock repository behavior
            when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(mockTransaction));

            // Act
            Transaction foundTransaction = transactionService.findById(transactionId);

            // Assert
            assertEquals(mockTransaction, foundTransaction);
        }

        @Test
        @DisplayName("Should throw TransactionNotFoundException when transaction is not found")
        void shouldThrowTransactionNotFoundException() {
            // Arrange
            Long transactionId = 1L;

            // Mock repository behavior
            when(transactionRepository.findById(anyLong())).thenReturn(Optional.empty());

            // Act and Assert
            assertThrows(TransactionNotFoundException.class, () -> transactionService.findById(transactionId));
        }
    }

    @Nested
    class deleteTransactionById {

        private User sender;
        private User receiver;

        @BeforeEach
        void setUp() {
            sender = new User(1L, "Maria", "Souza", "99999999901", "maria@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
            receiver = new User(2L, "Joao", "Souza", "99999999902", "joao@gmail.com", "12345", new BigDecimal(100), UserType.COMUM);
        }

        @Test
        @DisplayName("Should delete transaction by ID successfully")
        void shouldDeleteTransactionByIdSuccessfully() throws TransactionNotFoundException {
            // Arrange
            Long transactionId = 1L;
            Transaction mockTransaction = new Transaction(transactionId, new BigDecimal("50.00"),sender, receiver, LocalDateTime.now());

            // Mock repository behavior
            when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(mockTransaction));

            // Act
            assertDoesNotThrow(() -> transactionService.deleteTransactionById(transactionId));

            // Verify
            verify(transactionRepository, times(1)).deleteById(transactionId);
        }

    }



}