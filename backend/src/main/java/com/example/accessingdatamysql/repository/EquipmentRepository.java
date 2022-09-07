package com.example.accessingdatamysql.repository;

import com.example.accessingdatamysql.models.ElementKit;
import com.example.accessingdatamysql.models.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;


public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

}
