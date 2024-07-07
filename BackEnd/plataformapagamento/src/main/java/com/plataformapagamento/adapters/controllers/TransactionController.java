package com.plataformapagamento.adapters.controllers;

import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.adapters.services.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "Transaction", description = "Endpoints for managing transactions")
@RestController()
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @Operation(summary = "Create a new transaction", description = "Create a new transaction with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transaction successfully created",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TransactionResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class))),
            @ApiResponse(responseCode = "403", description = "Unauthorized transaction",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "User or resource not found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody @Valid TransactionRequestDTO body) throws Exception {
        TransactionResponseDTO newTransaction = transactionService.createTransaction(body);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @Operation(summary = "List all transactions", description = "Retrieve a list of all transactions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TransactionResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> listTransactions(){
        List<TransactionResponseDTO> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @Operation(summary = "Delete a transaction", description = "Delete an existing transaction by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Transaction successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Transaction not found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class)))
    })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable @Valid Long id) throws Exception {
        transactionService.deleteTransactionById(id);
        return ResponseEntity.accepted().build();
    }
}