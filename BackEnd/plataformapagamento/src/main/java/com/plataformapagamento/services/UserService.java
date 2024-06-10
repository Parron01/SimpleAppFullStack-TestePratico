package com.plataformapagamento.services;

import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import com.plataformapagamento.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void ValidateTransaction(User user, BigDecimal amount) throws Exception {
        if(user.getUserType() == UserType.Lojista){
            throw new Exception("Lojistas não estão autorizados a realizar tranferência.");
        }
        if(user.getBalance().compareTo(amount) < 0){
            throw new Exception("Saldo Insuficiente para a transação.");
        }
    }

   public User findUserById(Long id) throws Exception{
        User user = this.userRepository.findUserById(id).orElseThrow(()-> new Exception("Usuario nao encontrado."));
        return user;
    }

    public void saveUser(User user){
        this.userRepository.save(user);
    }
}
