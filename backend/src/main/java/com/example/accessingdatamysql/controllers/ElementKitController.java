package com.example.accessingdatamysql.controllers;

import com.example.accessingdatamysql.models.ElementKit;
import com.example.accessingdatamysql.repository.ElementKitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/element-kit")

public class ElementKitController {

    private final ElementKitRepository elementKitRepository;

    public ElementKitController(ElementKitRepository elementKitRepository) {this.elementKitRepository = elementKitRepository; }

    @GetMapping
    public List<ElementKit> getElementKit() {
        return elementKitRepository.findAll();
    }

    @GetMapping("/{id}")
    public ElementKit getElementKit(@PathVariable Long id) {
        return elementKitRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createElementKit(@RequestBody ElementKit elementKit) throws URISyntaxException {
        ElementKit savedElementKit = elementKitRepository.save(elementKit);
        return ResponseEntity.created(new URI("/element-kit/" + savedElementKit.getId())).body(savedElementKit);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateElementKit(@PathVariable Long id, @RequestBody ElementKit elementKit) {
        ElementKit currentElementKit = elementKitRepository.findById(id).orElseThrow(RuntimeException::new);
        currentElementKit.setKit(elementKit.getKit());
        currentElementKit = elementKitRepository.save(elementKit);

        return ResponseEntity.ok(currentElementKit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteElementKit(@PathVariable Long id) {
        elementKitRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
