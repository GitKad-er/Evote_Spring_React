package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.security.services.BulletinVoteService;
import com.bezkoder.springjwt.security.services.ResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "api/verification")
public class ResController {
    @Autowired
    BulletinVoteService bulletinVoteService;

    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    private ResService resService;
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return resService.confirmToken(token);
    }


    @GetMapping(path="vote")
    public String voteConfirm(@RequestParam("codeVote")String codeVote, @RequestParam("user_id")Long id){
        BulletinVote bulletinVote = bulletinVoteService.findAllByUser_id(id);
        if(bulletinVote.getCodeVote()==codeVote){
            return "Code Valide";
        }
        else return "Code Incorrect";
    }

}
