package com.plataformapagamento.services;

import com.plataformapagamento.domain.transaction.Transaction;
import com.plataformapagamento.DTOs.TransactionRequestDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    RestTemplate restTemplate;

    public void createTransaction(TransactionRequestDTO transaction) throws Exception {
        User sender = userService.findUserById(transaction.id_sender());
        User receiver = userService.findUserById(transaction.id_receiver());

        userService.ValidateTransaction(sender,transaction.value());

        boolean isAuthorized = this.authorizeTransaction(sender,transaction.value());
        if(!isAuthorized){
            throw new Exception("Transação não autorizada.");
        }

        Transaction newTransaction = new Transaction();
        newTransaction.setSender(sender);
        newTransaction.setReceiver(receiver);
        newTransaction.setAmount(transaction.value());
        newTransaction.setTimestamp(LocalDateTime.now());

        sender.setBalance(sender.getBalance().subtract(transaction.value()));
        receiver.setBalance(receiver.getBalance().add(transaction.value()));

        this.transactionRepository.save(newTransaction);
        this.userService.saveUser(sender);
        this.userService.saveUser(receiver);
    }

    public boolean authorizeTransaction(User sender, BigDecimal value){
        ResponseEntity<Map> authorizationResponse = restTemplate.getForEntity("https://util.devi.tools/api/v2/authorize", Map.class);

        if(authorizationResponse.getStatusCode()== HttpStatus.OK){
            String message = (String) authorizationResponse.getBody().get("message");
            return "Autorizado".equalsIgnoreCase(message);
        }else return false;
    }

}
