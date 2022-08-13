package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}
