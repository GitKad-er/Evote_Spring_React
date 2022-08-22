package com.kader.springjwt.registration.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller

public class ConfirmationTokenController {
    @Autowired
    ConfirmationTokenService confirmationTokenService;

    public void saveConfToken(ConfirmationToken confirmationToken){
        confirmationTokenService.saveConfirmationToken(confirmationToken);
    }

}
