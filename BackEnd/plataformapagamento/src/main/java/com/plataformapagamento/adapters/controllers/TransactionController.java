package com.plataformapagamento.adapters.controllers;

import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.adapters.services.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody @Valid TransactionRequestDTO body) throws Exception {
        TransactionResponseDTO newTransaction = transactionService.createTransaction(body);

        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> listTransactions(){
        List<TransactionResponseDTO> transactions = transactionService.getAllTransactions();

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) throws Exception {
        transactionService.deleteTransactionById(id);

        return ResponseEntity.accepted().build();
    }
}
