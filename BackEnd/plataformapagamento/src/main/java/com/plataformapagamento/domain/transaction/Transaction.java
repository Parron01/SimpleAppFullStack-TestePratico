package com.plataformapagamento.domain.transaction;

import com.plataformapagamento.domain.user.User;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Date;

@Entity(name = "transactions")
@Table(name = "transactions")
@Getter
@Setter
@EqualsAndHashCode(of = "id")

public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name="sender_id")
    private User sender;
    @ManyToOne
    @JoinColumn(name="receiver_id")
    private User receiver;
    private LocalTime timestamp;
}
