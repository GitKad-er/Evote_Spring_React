package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.exceptions.ResourceNotFoundException;
import com.bezkoder.springjwt.models.UserDetail;
import com.bezkoder.springjwt.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailService implements org.springframework.security.core.userdetails.UserDetailsService {
  private final static String USER_NOT_FOUND_MSG =
          "user with email %s not found";
  @Autowired
  UserDetailRepository userDetailRepository;

  /*@Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisteur associé au nom d'utilisateur: " + username));

    return UserDetail.build(user);
  }*/

  //Recherche d'un user en fonction du courriel
  public UserDetails loadUserByUsername(String email)
          throws UsernameNotFoundException {
    return userDetailRepository.findByEmail(email)
            .orElseThrow(() ->
                    new UsernameNotFoundException(
                            String.format(USER_NOT_FOUND_MSG, email)));
  }

  //Liste de tous les employés
  public List<UserDetail> findAllUserDetail(){
    return userDetailRepository.findAll();
  }


  //Activer un utilisateur
  public int enableUser(String email) {
    return userDetailRepository.enableUserDetailsImpl(email);
  }


  //Mettre à jour un utilisateur
  public UserDetail getUser(Long id){
    Optional<UserDetail> optionalUser = userDetailRepository.findById(id);
    if(optionalUser.isPresent()){
      UserDetail userDetails;
      userDetails = optionalUser.get();
      return userDetails;
    }
    throw new ResourceNotFoundException("Utlisateur inexistant");
  }

  //Supprimer un utilisateur



}
