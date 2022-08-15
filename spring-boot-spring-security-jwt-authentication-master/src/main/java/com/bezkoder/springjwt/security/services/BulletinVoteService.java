package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.repository.BulletinVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinVoteService {
    @Autowired
    private BulletinVoteRepository bulletinVoteRepository;
    public List<BulletinVote> findAllBulletinVote() {
        return bulletinVoteRepository.findAll();
    }

    public void save(BulletinVote bulletinVote) {
        bulletinVoteRepository.save(bulletinVote);
    }
}
