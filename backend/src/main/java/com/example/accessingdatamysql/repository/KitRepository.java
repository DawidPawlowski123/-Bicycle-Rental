package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.Kit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface KitRepository extends JpaRepository<Kit, Long> {
}
