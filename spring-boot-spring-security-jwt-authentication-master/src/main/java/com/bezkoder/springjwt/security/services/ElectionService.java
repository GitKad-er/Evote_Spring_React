package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.exceptions.ResourceNotFoundException;
import com.bezkoder.springjwt.models.Candidat;
import com.bezkoder.springjwt.models.Election;
import com.bezkoder.springjwt.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ElectionService {

    @Autowired
    private ElectionRepository electionRepository;

    public List<Election> getAllElection() {
        return electionRepository.findAll();
    }

    public List<Election> getAllComingElection(){
        return electionRepository.findAllByStatus("A venir");
    }

    public Election saveElection(Election election) {
        return electionRepository.save(election);
    }

    public Election getElection(Long id){
        Optional<Election> optionalElection = electionRepository.findById(id);
        if(optionalElection.isPresent()){
            Election election;
            election = optionalElection.get();
            return election;
        }
        throw new ResourceNotFoundException("Election inexistante");
    }

    public List<Election> getValidElection(Date date) {
       return electionRepository.findAll();
    }
}
