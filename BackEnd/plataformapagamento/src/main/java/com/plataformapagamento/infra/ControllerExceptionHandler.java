package com.plataformapagamento.infra;

import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity threatDuplicateEntry(DataIntegrityViolationException exception){
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO("A operação não pode ser realizada.", "400");
        return ResponseEntity.badRequest().body(exceptionResponseDTO);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity threat404(EntityNotFoundException exception){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity threatGeneralException(Exception exception){
        ExceptionResponseDTO exceptionResponseDTO = new ExceptionResponseDTO(exception.getMessage(), "500");
        return ResponseEntity.internalServerError().body(exceptionResponseDTO);
    }
}
