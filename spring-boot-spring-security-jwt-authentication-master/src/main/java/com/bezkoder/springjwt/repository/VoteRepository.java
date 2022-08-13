package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

}
