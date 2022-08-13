package com.bezkoder.springjwt.registration.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class ConfirmationTokenController {
    @Autowired
    ConfirmationTokenService confirmationTokenService;

    public void saveConfToken(ConfirmationToken confirmationToken){
        confirmationTokenService.saveConfirmationToken(confirmationToken);
    }

}
