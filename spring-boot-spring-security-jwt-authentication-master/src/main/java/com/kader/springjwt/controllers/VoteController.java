package com.kader.springjwt.controllers;

import com.kader.springjwt.models.Candidat;
import com.kader.springjwt.security.services.BulletinVoteService;
import com.kader.springjwt.security.services.ElectionService;
import com.kader.springjwt.security.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/voter")
public class VoteController {

    @Autowired
    private BulletinVoteService bulletinService;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private ElectionService electionService;

    @GetMapping("/code")
    public List<Candidat> candidatList(@PathVariable("id") Long userId, @RequestParam ("codeVote") String codeVote){
        if (bulletinService.findBulletinVoteByUserDetail(userDetailService.getUser(userId)).getCodeVote()==codeVote){

        }
    }

   /* @PostMapping("choix")
    public ResponseEntity<?> saveVote(@RequestParam("userId") Long userId, @RequestParam("candidat_id") Long candidat_id){
        BulletinVote bulletinVote=bulletinService.findAllByUser_id(userId)
    }*/



}
