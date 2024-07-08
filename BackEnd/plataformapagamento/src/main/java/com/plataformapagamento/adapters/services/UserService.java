package com.plataformapagamento.adapters.services;

import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.user.UserRequestDTO;
import com.plataformapagamento.adapters.DTOs.user.UserResponseDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.domain.user.UserType;
import com.plataformapagamento.adapters.repositories.UserRepository;
import com.plataformapagamento.infra.exceptions.InsufficientBalanceException;
import com.plataformapagamento.infra.exceptions.UnauthorizedUserException;
import com.plataformapagamento.infra.exceptions.UserNotFoundException;
import jakarta.validation.constraints.NotNull;
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
            throw new UnauthorizedUserException("Lojistas não estão autorizados a realizar tranferência.");
        }
        if (user.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Saldo Insuficiente para a transação.");
        }
    }

   public User findUserById(Long id) throws Exception{
        User user = this.userRepository.findUserById(id)
                .orElseThrow(()-> new UserNotFoundException("Usuario nao encontrado."));
        return user;
    }

    public UserResponseDTO createUser(UserRequestDTO data) throws Exception {
        User newUser = new User(data);
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        newUser.setPassword(encryptedPassword);
        try{ this.userRepository.save(newUser); }
        catch(DataIntegrityViolationException e){throw new DataIntegrityViolationException("Usuario já cadastrado. Email ou Documento já existe.");}


        return new UserResponseDTO(newUser);
    }

    public List<UserResponseDTO> getAllUser(){
        List<UserResponseDTO> users = this.userRepository.findAll()
                .stream()
                .map(UserResponseDTO::new).toList();
        return users;
    }
    @NotNull
    public void saveUser(User user){
        this.userRepository.save(user);
    }

    public User deleteUser(Long id) throws Exception {
        User deletedUser = this.findUserById(id);

        try{ this.userRepository.deleteById(id); }
        catch(DataIntegrityViolationException e){throw new DataIntegrityViolationException("Não é possível deletar o usuario. Pode estar relacionado a alguma transação.");}

        return deletedUser;
    }
}
