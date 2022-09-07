package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}