package com.kader.springjwt.repository;

import com.kader.springjwt.models.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
}
