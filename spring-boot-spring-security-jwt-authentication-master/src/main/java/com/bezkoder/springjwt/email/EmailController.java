package com.bezkoder.springjwt.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class EmailController {
    @Autowired
    private EmailSender emailSender;

    public void sendEmail(String dest, String message){
        emailSender.send(dest, message);
    }
}
