package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.DTOs.transaction.TransactionResponseDTO;
import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.adapters.DTOs.transaction.TransactionRequestDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.adapters.repositories.TransactionRepository;
import com.plataformapagamento.infra.exceptions.TransactionNotFoundException;
import com.plataformapagamento.infra.exceptions.UnauthorizedTransactionException;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthorizationService authService;


    public TransactionResponseDTO createTransaction(TransactionRequestDTO transaction) throws Exception {
        User sender = userService.findUserById(transaction.id_sender());
        User receiver = userService.findUserById(transaction.id_receiver());

        userService.ValidateTransaction(sender,transaction.value());

        boolean isAuthorized = authService.authorizeTransaction(sender, transaction.value());
        if (!isAuthorized) {
            throw new UnauthorizedTransactionException("Transação não autorizada.");
        }

        Transaction newTransaction = this.saveNewTransaction(sender, receiver, transaction.value());

        this.updateUsersBalances(sender,receiver,transaction.value());

        this.notificationService.sendNotification(sender, "Transação realizada com sucesso!");
        this.notificationService.sendNotification(receiver, "Transação recebida com sucesso!");

        return new TransactionResponseDTO(newTransaction);
    }


    public List<TransactionResponseDTO> getAllTransactions(){
        List<TransactionResponseDTO> AllTransactions = this.transactionRepository.findAll().stream().map(TransactionResponseDTO::new).toList();
        return AllTransactions;
    }

    @NotNull
    public Transaction saveNewTransaction(User sender, User receiver, @DecimalMin(value = "0.01") BigDecimal amount) {
        Transaction newTransaction = new Transaction(sender,receiver,amount);
        Transaction CreatedTransaction = this.transactionRepository.save(newTransaction);
        return CreatedTransaction;
    }

    public void updateUsersBalances(User sender, User receiver, BigDecimal amount){
        sender.setBalance(sender.getBalance().subtract(amount));
        receiver.setBalance(receiver.getBalance().add(amount));

        this.userService.saveUser(sender);
        this.userService.saveUser(receiver);
    }

    public Transaction findById(Long id) throws TransactionNotFoundException {
        return this.transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Transação não encontrada."));
    }

    public void deleteTransactionById(Long id) throws Exception {
        Transaction transaction = this.findById(id);
        transactionRepository.deleteById(id);
    }
}
