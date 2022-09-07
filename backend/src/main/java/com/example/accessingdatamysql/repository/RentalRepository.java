package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
