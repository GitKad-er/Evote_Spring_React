package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Candidat;
import com.bezkoder.springjwt.models.UserDetail;
import com.bezkoder.springjwt.repository.CandidatRepository;
import com.bezkoder.springjwt.security.services.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/candidat")
public class CandidatController {
    @Autowired
    private CandidatService candidatService;
    @Autowired
    private CandidatRepository candidatRepository;

    //Liste des candidats
    @GetMapping("/all")
    public List<Candidat> candidats(){
        return candidatService.getAllCandidat();
    }

    //Ajout d'un candidat
    @PostMapping("/save")
    public Candidat createCandidat(@RequestBody Candidat candidat){
        return  candidatService.saveCandidat(candidat);
    }

    //Mise  à jour d'un candidat
    @PutMapping("/update/{id}")
    public ResponseEntity<Candidat> updateCandidat(@PathVariable Long id, @RequestBody Candidat candidat) {

        if (candidatService.getCandidat(id).getClass() == candidat.getClass()) {
            Candidat candidatFound = candidatService.getCandidat(id);
            candidatFound.setFirstname(candidat.getFirstname());
            candidatFound.setLastname(candidat.getLastname());
            candidatFound.setPresentation(candidat.getPresentation());
            candidatFound.setPhoto(candidat.getPhoto());
            Candidat updatedCandidat = candidatService.saveCandidat(candidatFound);
            return ResponseEntity.ok(updatedCandidat);
        } else {
            throw new RuntimeException("Requête de mise à jour erronée(Candidat)");
        }
    }

    //Lien - suppression d'un candidat
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCandidat(@PathVariable Long id) {
        Candidat candidat = new Candidat();
        if (candidatService.getCandidat(id).getClass() == candidat.getClass()) {
            Candidat candidatFound = candidatService.getCandidat(id);
            candidatRepository.delete(candidatFound);
            Map<String, Boolean> response = new HashMap<>();
            response.put("Suppression du candidat terminée", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Requête de suppression erronée - candidat");

        }
    }








}
