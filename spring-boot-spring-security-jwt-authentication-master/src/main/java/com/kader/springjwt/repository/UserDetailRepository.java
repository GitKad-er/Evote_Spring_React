package com.kader.springjwt.repository;


import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.security.services.UserDetailService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserDetailRepository
        extends JpaRepository<UserDetail, Long> {

    UserDetailService USER_DETAIL_SERVICE = new UserDetailService();
    Optional<UserDetail> findByEmail(String email);

    Optional<UserDetail> findById(Long id);

    List<UserDetail> findAll();

    //List<UserDetail> val=findAll();

    @Query("SELECT (UserDetail) FROM UserDetail")
    static List<UserDetail> findAllUser(){

        return findAllUser();
    };


    @Transactional
    @Modifying
    @Query("UPDATE UserDetail u " +
            "SET u.enabled = TRUE WHERE u.email = ?1")
    int enableUserDetailsImpl(String email);

    boolean existsByEmail(String email);

    //boolean existsByUsername(String username);


}