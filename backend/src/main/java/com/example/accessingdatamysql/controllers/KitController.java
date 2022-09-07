package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.ElementKit;
import com.example.accessingdatamysql.models.Kit;
import com.example.accessingdatamysql.repository.KitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/kit")


public class KitController {

    private final KitRepository kitRepository;

    public KitController(KitRepository kitRepository) {this.kitRepository = kitRepository; }

    @GetMapping
    public List<Kit> getKit() {
        return kitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Kit getKit(@PathVariable Long id) {
        return kitRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createKit(@RequestBody Kit kit) throws URISyntaxException {
        Kit savedKit = kitRepository.save(kit);
        return ResponseEntity.created(new URI("/element-kit/" + savedKit.getId())).body(savedKit);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateKit(@PathVariable Long id, @RequestBody Kit kit) {
        Kit currentKit = kitRepository.findById(id).orElseThrow(RuntimeException::new);
        currentKit.setKitStatus(kit.getKitStatus());
        currentKit = kitRepository.save(kit);
        return ResponseEntity.ok(currentKit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteKit(@PathVariable Long id) {
        kitRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
