package com.kader.springjwt.repository;

import com.kader.springjwt.models.Election;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {
    public List<Election> findAllByStatus(String status);
}
