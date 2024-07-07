package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.user.UserRequestDTO;
import com.plataformapagamento.adapters.DTOs.user.UserResponseDTO;
import com.plataformapagamento.adapters.repositories.UserRepository;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import com.plataformapagamento.infra.exceptions.InsufficientBalanceException;
import com.plataformapagamento.infra.exceptions.UnauthorizedUserException;
import com.plataformapagamento.infra.exceptions.UserNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
            Exception exception = assertThrows(UnauthorizedUserException.class, () -> userService.ValidateTransaction(user, amount));
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
            Exception exception = assertThrows(InsufficientBalanceException.class, () -> userService.ValidateTransaction(user, amount));
            assertEquals("Saldo Insuficiente para a transação.", exception.getMessage());
        }

    }
    @Nested
    class FindUserById {

        @Test
        @DisplayName("Should return user when user is found")
        void shouldReturnUserWhenUserIsFound() throws Exception {
            // Arrange
            User user = new User();
            when(userRepository.findUserById(any(Long.class))).thenReturn(Optional.of(user));

            // Act
            User result = userService.findUserById(1L);

            // Assert
            assertNotNull(result);
            assertEquals(user, result);
        }

        @Test
        @DisplayName("Should throw exception when user is not found")
        void shouldThrowExceptionWhenUserIsNotFound() {
            // Arrange
            when(userRepository.findUserById(any(Long.class))).thenReturn(Optional.empty());

            // Act & Assert
            Exception exception = assertThrows(UserNotFoundException.class, () -> userService.findUserById(1L));
            assertEquals("Usuario nao encontrado.", exception.getMessage());
        }
    }

    @Nested
    class CreateUser {

        @Test
        @DisplayName("Should create user successfully")
        void shouldCreateUserSuccessfully() throws Exception {
            // Arrange
            UserRequestDTO requestDTO = new UserRequestDTO(
                    "John",
                    "Doe",
                    "123456789",
                    "john.doe@example.com",
                    "password",
                    BigDecimal.valueOf(1000),
                    UserType.COMUM
            );
            User user = new User(requestDTO);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encryptedPassword = passwordEncoder.encode(requestDTO.password());
            user.setPassword(encryptedPassword);

            when(userRepository.save(userArgumentCaptor.capture())).thenReturn(user);

            // Act
            UserResponseDTO result = userService.createUser(requestDTO);

            // Assert
            assertNotNull(result);
            assertTrue(passwordEncoder.matches(requestDTO.password(), result.password()));
        }

        @Test
        @DisplayName("Should throw exception when user already exists")
        void shouldThrowExceptionWhenUserAlreadyExists() {
            // Arrange
            UserRequestDTO requestDTO = new UserRequestDTO(
                    "John",
                    "Doe",
                    "123456789",
                    "john.doe@example.com",
                    "password",
                    BigDecimal.valueOf(1000),
                    UserType.COMUM
            );
            when(userRepository.save(any())).thenThrow(new DataIntegrityViolationException(""));

            // Act & Assert
            Exception exception = assertThrows(DataIntegrityViolationException.class, () -> userService.createUser(requestDTO));
            assertEquals("Usuario já cadastrado.", exception.getMessage());
        }
    }

    @Nested
    class GetAllUser {

        @Test
        @DisplayName("Should return all users")
        void shouldReturnAllUsers() {
            // Arrange
            User user = new User();
            List<User> users = List.of(user);
            when(userRepository.findAll()).thenReturn(users);

            // Act
            List<UserResponseDTO> result = userService.getAllUser();

            // Assert
            assertNotNull(result);
            assertEquals(1, result.size());
            assertThat(result, containsInAnyOrder(new UserResponseDTO(user)));
        }
    }

    @Nested
    class DeleteUser {

        @Test
        @DisplayName("Should delete user successfully")
        void shouldDeleteUserSuccessfully() throws Exception {
            // Arrange
            User user = new User();
            when(userRepository.findUserById(any(Long.class))).thenReturn(Optional.of(user));
            doNothing().when(userRepository).deleteById(any(Long.class));

            // Act
            User result = userService.deleteUser(1L);

            // Assert
            assertNotNull(result);
            verify(userRepository, times(1)).deleteById(any(Long.class));
        }

        @Test
        @DisplayName("Should throw exception when user cannot be deleted")
        void shouldThrowExceptionWhenUserCannotBeDeleted() {
            // Arrange
            when(userRepository.findUserById(any(Long.class))).thenReturn(Optional.of(new User()));
            doThrow(new DataIntegrityViolationException("")).when(userRepository).deleteById(any(Long.class));

            // Act & Assert
            Exception exception = assertThrows(DataIntegrityViolationException.class, () -> userService.deleteUser(1L));
            assertEquals("Não é possível deletar o usuario.", exception.getMessage());
        }

    }
}