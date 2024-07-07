package com.plataformapagamento.adapters.controllers;

import com.plataformapagamento.adapters.DTOs.DeleteDTO;
import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import com.plataformapagamento.adapters.DTOs.user.UserRequestDTO;
import com.plataformapagamento.adapters.DTOs.user.UserResponseDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.adapters.services.UserService;
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

@Tag(name = "User", description = "Endpoints for managing users")
@RestController()
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    @Operation(summary = "List all users", description = "Retrieve a list of all registered users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> listUser(){
        List<UserResponseDTO> users = userService.getAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Operation(summary = "Register a new user", description = "Create a new user with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User successfully created",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class))),
            @ApiResponse(responseCode = "409", description = "User already exists",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class)))
    })
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserRequestDTO body) throws Exception {
        UserResponseDTO newUser = userService.createUser(body);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @Operation(summary = "Delete a user", description = "Delete an existing user by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "User successfully deleted"),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class)))
    })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable @Valid Long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.accepted().build();
    }
}