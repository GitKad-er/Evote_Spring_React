package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.security.services.ResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/registration")
public class ResController {
    @Autowired
    private ResService resService;
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return resService.confirmToken(token);
    }

}
