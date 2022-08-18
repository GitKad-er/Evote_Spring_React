package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.security.services.BulletinVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/voter")
public class VoteController {

    @Autowired
    private BulletinVoteService bulletinService;

   /* @PostMapping("choix")
    public ResponseEntity<?> saveVote(@RequestParam("userId") Long userId, @RequestParam("candidat_id") Long candidat_id){
        BulletinVote bulletinVote=bulletinService.findAllByUser_id(userId)
    }*/



}
