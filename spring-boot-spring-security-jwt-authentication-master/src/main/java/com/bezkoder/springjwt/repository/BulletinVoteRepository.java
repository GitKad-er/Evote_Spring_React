package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BulletinVoteRepository extends JpaRepository<BulletinVote, Long> {

}
