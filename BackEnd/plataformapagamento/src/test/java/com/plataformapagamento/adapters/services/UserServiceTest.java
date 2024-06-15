package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.repositories.UserRepository;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userArgumentCaptor;

    @Nested
    class ValidateTransaction {

        @Test
        @DisplayName("Should throw exception when user is LOJISTA")
        void shouldThrowExceptionWhenUserIsLojista() {
            // Arrange
            User user = new User();
            user.setUserType(UserType.LOJISTA);
            BigDecimal amount = BigDecimal.valueOf(100);

            // Act & Assert
            Exception exception = assertThrows(Exception.class, () -> userService.ValidateTransaction(user, amount));
            assertEquals("Lojistas não estão autorizados a realizar tranferência.", exception.getMessage());
        }

        @Test
        @DisplayName("Should throw exception when balance is insufficient")
        void shouldThrowExceptionWhenBalanceIsInsufficient() {
            // Arrange
            User user = new User();
            user.setUserType(UserType.COMUM);
            user.setBalance(BigDecimal.valueOf(50));
            BigDecimal amount = BigDecimal.valueOf(100);

            // Act & Assert
            Exception exception = assertThrows(Exception.class, () -> userService.ValidateTransaction(user, amount));
            assertEquals("Saldo Insuficiente para a transação.", exception.getMessage());
        }
    }
}