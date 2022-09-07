package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.Payment;
import com.example.accessingdatamysql.repository.ClientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.accessingdatamysql.repository.PaymentRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/payments")

public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {this.paymentRepository = paymentRepository; }

    @GetMapping
    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Payment getClient(@PathVariable Long id) {
        return paymentRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody Payment payment) throws URISyntaxException {
        Payment savedClient = paymentRepository.save(payment);
        return ResponseEntity.created(new URI("/payments/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody Payment payment) {
        Payment currentPayment = paymentRepository.findById(id).orElseThrow(RuntimeException::new);
        currentPayment.setAmount(payment.getAmount());
        currentPayment.setPaymentStatus(payment.getPaymentStatus());
        currentPayment = paymentRepository.save(payment);

        return ResponseEntity.ok(currentPayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePayment(@PathVariable Long id) {
        paymentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
