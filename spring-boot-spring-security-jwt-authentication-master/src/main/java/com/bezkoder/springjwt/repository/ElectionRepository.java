package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Election;
import com.bezkoder.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionRepository extends JpaRepository<Election, Long> {
}
