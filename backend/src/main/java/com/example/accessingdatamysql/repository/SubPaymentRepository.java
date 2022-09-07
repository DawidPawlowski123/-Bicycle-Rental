package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.SubPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SubPaymentRepository extends JpaRepository<SubPayment, Long> {
}
