package com.plataformapagamento.adapters.repositories;

import com.plataformapagamento.domain.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM transactions t WHERE t.sender.id = :userId OR t.receiver.id = :userId ORDER BY t.timestamp DESC")
    List<Transaction> findAllByUserId(@Param("userId") Long userId);

}
