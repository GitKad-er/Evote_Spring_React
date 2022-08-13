package com.bezkoder.springjwt.security.services;


import com.bezkoder.springjwt.registration.token.ConfirmationToken;
import com.bezkoder.springjwt.registration.token.ConfirmationTokenService;
import com.bezkoder.springjwt.repository.UserDetailRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@AllArgsConstructor
public class ResService {
    @Autowired
    private final ConfirmationTokenService confirmationTokenService;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private UserDetailRepository userDetailRepository;


    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Lien Invalide"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Compte déjà confirmé");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Lien expiré");
        }

        confirmationTokenService.setConfirmedAt(token);
        userDetailService.enableUser(
                confirmationToken.getUserDetail().getEmail());
        return "Compte confirmé";
    }
}
