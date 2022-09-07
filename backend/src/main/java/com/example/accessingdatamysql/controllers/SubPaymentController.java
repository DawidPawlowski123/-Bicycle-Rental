package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.SubPayment;
import com.example.accessingdatamysql.repository.PaymentRepository;
import com.example.accessingdatamysql.repository.SubPaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/sub-payments")

public class SubPaymentController {

    private final SubPaymentRepository subPaymentRepository;

    public SubPaymentController(SubPaymentRepository subPaymentRepository) {this.subPaymentRepository = subPaymentRepository; }

    @GetMapping
    public List<SubPayment> getPayments() {
        return subPaymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public SubPayment getClient(@PathVariable Long id) {
        return subPaymentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody SubPayment subPayment) throws URISyntaxException {
        SubPayment savedClient = subPaymentRepository.save(subPayment);
        return ResponseEntity.created(new URI("/sub-payments/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody SubPayment subPayment) {
        SubPayment currentSubPayment = subPaymentRepository.findById(id).orElseThrow(RuntimeException::new);
        currentSubPayment.setPayment(subPayment.getPayment());
        currentSubPayment.setSubAmount(subPayment.getSubAmount());
        currentSubPayment.setPaymentType(subPayment.getPaymentType());
        currentSubPayment.setPaymentDate(subPayment.getPaymentDate());
        currentSubPayment = subPaymentRepository.save(subPayment);

        return ResponseEntity.ok(currentSubPayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePayment(@PathVariable Long id) {
        subPaymentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
