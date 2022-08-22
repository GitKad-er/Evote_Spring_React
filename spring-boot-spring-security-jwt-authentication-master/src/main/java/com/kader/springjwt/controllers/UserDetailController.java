package com.kader.springjwt.controllers;

import com.kader.springjwt.email.EmailController;
import com.kader.springjwt.exceptions.ResourceNotFoundException;
import com.kader.springjwt.models.ERole;
import com.kader.springjwt.models.Role;
import com.kader.springjwt.payload.request.SignupRequest;
import com.kader.springjwt.payload.response.MessageResponse;
import com.kader.springjwt.registration.token.ConfirmationToken;
import com.kader.springjwt.registration.token.ConfirmationTokenController;
import com.kader.springjwt.registration.token.ConfirmationTokenService;
import com.kader.springjwt.repository.RoleRepository;
import com.kader.springjwt.repository.UserDetailRepository;
import com.kader.springjwt.security.services.ResService;
import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.security.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserDetailController {
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private ConfirmationTokenController confirmationTokenController;
    @Autowired
    private EmailController emailController;
    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private ResService resService;
    @Autowired
    private RoleRepository roleRepository;


    //Tous les utilisateurs
    @GetMapping("/all")
    public List<UserDetail> getAllUsers() {
        return userDetailService.findAllUserDetail();
    }

    //Lien- recherche d'un user -id

    @GetMapping("/account/{id}")
    public ResponseEntity<UserDetail> getTheUser(@PathVariable("id") Long id) {
        UserDetail user = userDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur inexsistant : " + id));
        return ResponseEntity.ok(user);
    }


    //Lien pour la mise à jour d'un user
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDetail> updateUser(@PathVariable Long id, @RequestBody UserDetail userDetails) {

        if (userDetailService.getUser(id).getClass() == userDetails.getClass()) {
            UserDetail userFound = userDetailService.getUser(id);
            userFound.setFirstname(userDetails.getFirstname());
            userFound.setLastname(userDetails.getLastname());
            userFound.setEmail(userDetails.getEmail());
            userFound.setBirthdate(userDetails.getBirthdate());
            userFound.setAge(LocalDateTime.now().getYear() - userDetails.getBirthdate().getYear());
            userFound.setSex(userDetails.getSex());

            UserDetail updatedUser = userDetailRepository.save(userFound);
            return ResponseEntity.ok(updatedUser);
        } else {
            throw new RuntimeException("Requête de mise à jour erronée");
        }
    }

    //Lien - suppression d'un user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        UserDetail userDetails = new UserDetail();
        if (userDetailService.getUser(id).getClass() == userDetails.getClass()) {
            UserDetail userFound = userDetailService.getUser(id);
            userDetailRepository.delete(userFound);
            Map<String, Boolean> response = new HashMap<>();
            response.put("Suppression terminée", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Requête de suppression erronée");

        }
    }

    @PostMapping("/admin/signup")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userDetailRepository.existsByEmail(signUpRequest.getEmail())) {

            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Erreur: Courriel déjà associé à un compte"));
        } else {

            UserDetail userDetail = new UserDetail(signUpRequest.getFirstname(),
                    signUpRequest.getLastname(),
                    signUpRequest.getBirthdate(),
                    signUpRequest.getAge(),
                    signUpRequest.getSex(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));


            Set<Role> roles = new HashSet<>();

            roles.add(roleRepository.findByName(ERole.ROLE_ADMIN));


            // Create new user's account

            userDetail.setRoles(roles);
            userDetailRepository.save(userDetail);

            //Créer le token de validation
            String token = UUID.randomUUID().toString();

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    userDetail
            );

            ConfirmationTokenService confirmationTokenService;

            confirmationTokenController.saveConfToken(
                    confirmationToken);

//        TODO: SEND EMAIL

            String link = "http://localhost:9000/api/verification/confirm?token=" + token;


            emailController.sendEmail(
                    signUpRequest.getEmail(),
                    buildEmail(link));
            return ResponseEntity.ok(new MessageResponse("Un message contenant le lien d'activation a été envoyé à votre adresse. Veuillez cliquer dessus pour activer votre compte"));

        }


    }
    @PostMapping("/user/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userDetailRepository.existsByEmail(signUpRequest.getEmail())) {

            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Erreur: Courriel déjà associé à un compte"));
        } else {

            UserDetail userDetail = new UserDetail(signUpRequest.getFirstname(),
                    signUpRequest.getLastname(),
                    signUpRequest.getBirthdate(),
                    signUpRequest.getAge(),
                    signUpRequest.getSex(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));


            Set<Role> roles = new HashSet<>();

            roles.add(roleRepository.findByName(ERole.ROLE_USER));


            // Create new user's account

            userDetail.setRoles(roles);
            userDetailRepository.save(userDetail);

            //Créer le token de validation
            String token = UUID.randomUUID().toString();

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    userDetail
            );

            ConfirmationTokenService confirmationTokenService;

            confirmationTokenController.saveConfToken(
                    confirmationToken);

//        TODO: SEND EMAIL

            String link = "http://localhost:9000/api/verification/confirm?token=" + token;


            emailController.sendEmail(
                    signUpRequest.getEmail(),
                    buildEmail(link));
            return ResponseEntity.ok(new MessageResponse("Un message contenant le lien d'activation a été envoyé à votre adresse. Veuillez cliquer dessus pour activer votre compte"));

        }

    }
    private String buildEmail( String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Vérifier votre courriel</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Merci pour votre inscrption. Veuillez cliquer le lien ci-dessous pour activer votre compte </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Valider</a> </p></blockquote>\n Ce lien expirera dans 15 min. <p>Au plaisir de vous revoi</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div>" +
                "</div>";
    }
}
