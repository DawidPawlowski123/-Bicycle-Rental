package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
