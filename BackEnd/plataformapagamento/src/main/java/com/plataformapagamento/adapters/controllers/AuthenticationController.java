package com.plataformapagamento.adapters.controllers;

import com.plataformapagamento.adapters.DTOs.ExceptionResponseDTO;
import com.plataformapagamento.adapters.DTOs.authentication.LoginDTO;
import com.plataformapagamento.adapters.DTOs.authentication.LoginResponseDTO;
import com.plataformapagamento.adapters.DTOs.user.UserResponseDTO;
import com.plataformapagamento.domain.user.User;
import com.plataformapagamento.infra.security.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "AuthenticationController", description = "Endpoints for authentication with Login")
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;


    @Operation(summary = "Register a new user", description = "Create a new user with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User successfully created",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "403", description = "Unauthorized transaction",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponseDTO.class)))
    })
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO body){
        var usernamePassword = new UsernamePasswordAuthenticationToken(body.document(),body.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
