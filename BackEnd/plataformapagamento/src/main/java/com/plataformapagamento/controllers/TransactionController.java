package com.plataformapagamento.controllers;

import com.plataformapagamento.DTOs.TransactionRequestDTO;
import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.services.TransactionService;
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

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody @Valid TransactionRequestDTO body) throws Exception {
        Transaction newTransaction = transactionService.createTransaction(body);

        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> listTransactions(){
        List<Transaction> transactions = transactionService.getAllTransactions();

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
