package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Election;
import com.bezkoder.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {
    public List<Election> findAllByStatus(String status);
}
