package com.plataformapagamento.domain.user;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity(name="users")
@Table(name="users")
@Getter
@Setter
@EqualsAndHashCode(of="id")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String sobrenome;

    @Column(unique = true)
    private String documento;

    @Column(unique = true)
    private String email;

    private String senha;

    private BigDecimal saldo;

    @Enumerated(EnumType.STRING)
    private UserType userType;
}
