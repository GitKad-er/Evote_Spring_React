package com.kader.springjwt.controllers;

import com.kader.springjwt.security.services.BulletinVoteService;
import com.kader.springjwt.security.services.ResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


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
    public RedirectView confirm(@RequestParam("token") String token) {
        RedirectView redirectView = new RedirectView();

        redirectView.setUrl("http://localhost:4200");

        if ( resService.confirmToken(token)== "Compte confirmé"){

            return redirectView;
        }else throw new RuntimeException(resService.confirmToken(token));

    }


    /*@GetMapping(path="vote")
    public String voteConfirm(@RequestParam("codeVote")String codeVote, @RequestParam("user_id")Long id){
        BulletinVote bulletinVote = bulletinVoteService.findAllByUser_id(id);
        if(bulletinVote.getCodeVote()==codeVote){
            return "Code Valide";
        }
        else return "Code Incorrect";
    }*/

}
