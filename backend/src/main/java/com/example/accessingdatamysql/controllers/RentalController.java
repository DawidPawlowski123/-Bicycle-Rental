package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.Rental;
import com.example.accessingdatamysql.repository.RentalRepository;
import com.example.accessingdatamysql.repository.SubPaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/rental")

public class RentalController {

    private final RentalRepository rentalRepository;

    public RentalController(RentalRepository rentalRepository) {this.rentalRepository = rentalRepository; }

    @GetMapping
    public List<Rental> getPayments() {
        return rentalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rental getRental(@PathVariable Long id) {
        return rentalRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createRental(@RequestBody Rental rental) throws URISyntaxException {
        Rental savedRental = rentalRepository.save(rental);
        return ResponseEntity.created(new URI("/rental/" + savedRental.getId())).body(savedRental);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateRental(@PathVariable Long id, @RequestBody Rental rental) {
        Rental currentRental = rentalRepository.findById(id).orElseThrow(RuntimeException::new);
        currentRental.setClient(rental.getClient());
        currentRental.setStartDate(rental.getStartDate());
        currentRental.setEndDate(rental.getEndDate());
        currentRental.setStartTime(rental.getStartTime());
        currentRental.setEndTime(rental.getEndTime());
        currentRental.setRentalStatus(rental.getRentalStatus());
        currentRental = rentalRepository.save(rental);

        return ResponseEntity.ok(currentRental);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRental(@PathVariable Long id) {
        rentalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
