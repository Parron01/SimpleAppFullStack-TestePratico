package com.plataformapagamento.infra;

import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import com.plataformapagamento.infra.exceptions.InsufficientBalanceException;
import com.plataformapagamento.infra.exceptions.TransactionNotFoundException;
import com.plataformapagamento.infra.exceptions.UnauthorizedTransactionException;
import com.plataformapagamento.infra.exceptions.UserNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity<ExceptionResponseDTO> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("A operação não pode ser realizada."+exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionResponseDTO);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleEntityNotFound(EntityNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("Recurso não encontrado.", "404");
        return ResponseEntity.status(404).body(exceptionResponseDTO);
    }

    @ExceptionHandler(UnauthorizedTransactionException.class)
    private ResponseEntity<ExceptionResponseDTO> handleUnauthorizedTransaction(UnauthorizedTransactionException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "403");
        return ResponseEntity.status(403).body(exceptionResponseDTO);
    }

    @ExceptionHandler(UserNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleUserNotFound(UserNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "404");
        return ResponseEntity.status(404).body(exceptionResponseDTO);
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    private ResponseEntity<ExceptionResponseDTO> handleInsufficientBalance(InsufficientBalanceException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "403");
        return ResponseEntity.status(403).body(exceptionResponseDTO);
    }

    @ExceptionHandler(TransactionNotFoundException.class)
    private ResponseEntity<ExceptionResponseDTO> handleTransactionNotFound(TransactionNotFoundException exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "404");
        return ResponseEntity.status(404).body(exceptionResponseDTO);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<ExceptionResponseDTO> handleGeneralException(Exception exception) {
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "500");
        return ResponseEntity.status(500).body(exceptionResponseDTO);
    }
}
