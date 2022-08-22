package com.kader.springjwt.security.services;

import com.kader.springjwt.models.BulletinVote;
import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.repository.BulletinVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinVoteService {
    @Autowired
    private BulletinVoteRepository bulletinVoteRepository;
    public List<BulletinVote> findAllBulletinVote() {
        return bulletinVoteRepository.findAll();
    }

    public List<BulletinVote> findAllBulletinVoteByElection(String libelle){return bulletinVoteRepository.findAllByLibelle( libelle);}

    public void save(BulletinVote bulletinVote) {
        bulletinVoteRepository.save(bulletinVote);
    }

    public BulletinVote findBulletinVoteByUserDetail(UserDetail userDetail){return bulletinVoteRepository.findFirstByUserDetail(userDetail);}

    //public BulletinVote findAllByUser_id(Long id){
        //return bulletinVoteRepository.findAllByUserId(id);
    //};
}
