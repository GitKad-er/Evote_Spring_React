package com.kader.springjwt.security.services;

import com.kader.springjwt.exceptions.ResourceNotFoundException;
import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailService implements org.springframework.security.core.userdetails.UserDetailsService {
  private final static String USER_NOT_FOUND_MSG =
          "Aucun compte associé au couriiel : ";
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
