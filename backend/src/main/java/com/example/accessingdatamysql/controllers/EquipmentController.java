package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.ElementKit;
import com.example.accessingdatamysql.models.Equipment;
import com.example.accessingdatamysql.models.Payment;
import com.example.accessingdatamysql.repository.ElementKitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.accessingdatamysql.repository.EquipmentRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/equipment")

public class EquipmentController {

    private final EquipmentRepository equipmentRepository;

    @Autowired
    private ElementKitRepository elementKitRepository;

    public EquipmentController(EquipmentRepository equipmentRepository) {this.equipmentRepository = equipmentRepository; }

    @GetMapping
    public List<Equipment> getEquipment() {
        return equipmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Equipment getEquipment(@PathVariable Long id) {
         return equipmentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createEquipment(@RequestBody Equipment equipment) throws URISyntaxException {
        Equipment savedEquipment = equipmentRepository.save(equipment);
        return ResponseEntity.created(new URI("/equipment/" + savedEquipment.getId())).body(savedEquipment);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
        Equipment currentEquipment = equipmentRepository.findById(id).orElseThrow(RuntimeException::new);
        currentEquipment.setElementKit(equipment.getElementKit());
        currentEquipment.setName(equipment.getName());
        currentEquipment.setPricePerHour(equipment.getPricePerHour());
        currentEquipment.setSerialNumber(equipment.getSerialNumber());
        currentEquipment.setFailureInformation(equipment.getFailureInformation());
        currentEquipment.setAvailabilityStatus(equipment.getAvailabilityStatus());
        currentEquipment = equipmentRepository.save(equipment);

        return ResponseEntity.ok(currentEquipment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteEquipment(@PathVariable Long id) {
        equipmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
