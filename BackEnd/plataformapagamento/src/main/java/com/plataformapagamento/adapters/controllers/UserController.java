package com.plataformapagamento.adapters.controllers;

import com.plataformapagamento.adapters.DTOs.UserDeleteDTO;
import com.plataformapagamento.adapters.DTOs.UserRequestDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.adapters.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> listUser(){
        List<User> users = userService.getAllUser();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid UserRequestDTO body) throws Exception {
        User newuser = userService.createUser(body);
        return new ResponseEntity<>(newuser, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<User> delete (@RequestBody @Valid UserDeleteDTO body) throws Exception {
        User deletedUser = userService.deleteUser(body);

        return new ResponseEntity<>(deletedUser, HttpStatus.OK);
    }
}
