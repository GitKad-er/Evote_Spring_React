package com.kader.springjwt.controllers;

import com.kader.springjwt.events.OnElectionSaveEvent;
import com.kader.springjwt.models.Election;
import com.kader.springjwt.repository.ElectionRepository;
import com.kader.springjwt.security.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/elections")
public class ElectionController {
    @Autowired
    private ElectionRepository electionRepository;
    @Autowired
    private ElectionService electionService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;


    //Liste des elections
    @GetMapping("/all")
    public List<Election> elections(){
        return electionService.getAllElection();
    }

    //Selection d'une election
    @GetMapping("/get/{id}")

    public ResponseEntity<Election> getElection(@PathVariable Long id) {

        Election election = new Election();
        if (electionService.getElection(id).getClass() == election.getClass()) {

            Election electionFound = electionService.getElection(id);

            return ResponseEntity.ok(electionFound);
        } else {
            throw new RuntimeException("Election non existante(Election)");
        }
    }

            //Creation d'une election
    @PostMapping("/save")
    public Election createElection(@RequestBody Election election){
        List<Election>elections = electionService.getAllComingElection();
        for (Election electionVar:elections
             ) {
            if (election.getDatedeb().after(electionVar.getDatedeb())&& election.getDatedeb().before(electionVar.getDatefin())){
                throw new RuntimeException("Erreur : Une élection est déjà prévue à cette date");

            }else{
                eventPublisher.publishEvent(new OnElectionSaveEvent(election));
                election.setStatus("A venir");
                return  electionService.saveElection(election);
            }

        }
        return election;

    }

    //Mise à jour d'une election
    @PutMapping("/update/{id}")
    public ResponseEntity<Election> updateElection(@PathVariable Long id, @RequestBody Election election) {

        if (electionService.getElection(id).getClass() == election.getClass()) {

            Election electionFound = electionService.getElection(id);
            electionFound.setDatedeb(election.getDatedeb());
            electionFound.setDatefin(election.getDatefin());
            electionFound.setDescription(election.getDescription());
            Election updatedElection = electionService.saveElection(electionFound);
            return ResponseEntity.ok(updatedElection);
        } else {
            throw new RuntimeException("Requête de mise à jour erronée(Election)");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteElection(@PathVariable Long id) {
        Election election = new Election();
        if (electionService.getElection(id).getClass() == election.getClass()) {
            Election electionFound = electionService.getElection(id);
            electionRepository.delete(electionFound);
            Map<String, Boolean> response = new HashMap<>();
            response.put("Suppression d'une election terminée", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Requête de suppression erronée - election");

        }
    }

    /*@GetMapping("/aVenir")
    public List<Election> electionsValides(){
        return electionService.getValidElection(new Date());
    }*/

}
