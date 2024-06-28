package com.plataformapagamento.infra;

import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import com.plataformapagamento.infra.exceptions.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    private ResponseEntity<ExceptionResponseDTO> handleAuthenticationException(AuthenticationException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("A operação está proibida.", "403");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionResponseDTO);
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity<ExceptionResponseDTO> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("A operação não pode ser realizada. " + exception.getMessage(), "409");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionResponseDTO);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleEntityNotFound(EntityNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("Recurso não encontrado.", "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponseDTO);
    }

    @ExceptionHandler(UnauthorizedTransactionException.class)
    private ResponseEntity<ExceptionResponseDTO> handleUnauthorizedTransaction(UnauthorizedTransactionException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "403");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionResponseDTO);
    }
    @ExceptionHandler(UnauthorizedUserException.class)
    private ResponseEntity<ExceptionResponseDTO> handleUnauthorizedTransaction(UnauthorizedUserException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "403");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionResponseDTO);
    }

    @ExceptionHandler(UserNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleUserNotFound(UserNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponseDTO);
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    private ResponseEntity<ExceptionResponseDTO> handleInsufficientBalance(InsufficientBalanceException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "403");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionResponseDTO);
    }

    @ExceptionHandler(TransactionNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleTransactionNotFound(TransactionNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponseDTO);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<ExceptionResponseDTO> handleGeneralException(Exception exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "500");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponseDTO);
    }
}
