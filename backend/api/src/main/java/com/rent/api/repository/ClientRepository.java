package com.rent.api.repository;

import com.rent.api.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("SELECT p FROM Client p WHERE CONCAT(p.name, ' ', p.lastname, ' ', p.idDocument, ' ', p.phoneNumber) LIKE %?1%")
    public List<Client> search(String keyword);
}