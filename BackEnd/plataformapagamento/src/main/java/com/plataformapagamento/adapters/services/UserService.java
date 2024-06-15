package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.DTOs.UserDeleteDTO;
import com.plataformapagamento.adapters.DTOs.UserRequestDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import com.plataformapagamento.adapters.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void ValidateTransaction(User user, BigDecimal amount) throws Exception {
        if(user.getUserType() == UserType.LOJISTA){
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

    public User createUser(UserRequestDTO data) throws Exception {
        User newUser = new User(data);
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        newUser.setPassword(encryptedPassword);
        try{ this.userRepository.save(newUser); }
        catch(DataIntegrityViolationException e){throw new Exception("Usuario já cadastrado.");}

        return newUser;
    }
    public List<User> getAllUser(){
        List<User> users = this.userRepository.findAll();
        return users;
    }

    public void saveUser(User user){
        this.userRepository.save(user);
    }

    public User deleteUser(UserDeleteDTO data) throws Exception {
        User deletedUser = this.findUserById(data.id());

        try{ this.userRepository.deleteById(data.id()); }
        catch(DataIntegrityViolationException e){throw new Exception("Não é possível deletar o usuario.");}

        return deletedUser;
    }
}
