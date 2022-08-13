package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.exceptions.ResourceNotFoundException;
import com.bezkoder.springjwt.models.Candidat;
import com.bezkoder.springjwt.models.UserDetail;
import com.bezkoder.springjwt.repository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatService {

    @Autowired
    CandidatRepository candidatRepository;
    public List<Candidat> getAllCandidat() {
        return candidatRepository.findAll();
    }

    public Candidat saveCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    public Candidat getCandidat(Long id){
        Optional<Candidat> optionalCandidat = candidatRepository.findById(id);
        if(optionalCandidat.isPresent()){
            Candidat candidat;
            candidat = optionalCandidat.get();
            return candidat;
        }
        throw new ResourceNotFoundException("Candidat inexistant");
    }


}
