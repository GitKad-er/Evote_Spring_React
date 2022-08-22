package com.kader.springjwt.repository;

import com.kader.springjwt.models.BulletinVote;
import com.kader.springjwt.models.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BulletinVoteRepository extends JpaRepository<BulletinVote, Long> {

   // BulletinVote findAllByUserId(Long id)
    public List<BulletinVote>findAllByLibelle(String libelle);
    //public BulletinVote findByUserDetail(UserDetail userDetail);

    BulletinVote findFirstByUserDetail(UserDetail userDetail);
}
