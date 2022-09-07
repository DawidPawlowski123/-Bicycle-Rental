package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.ElementKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ElementKitRepository extends JpaRepository<ElementKit, Long> {
}
