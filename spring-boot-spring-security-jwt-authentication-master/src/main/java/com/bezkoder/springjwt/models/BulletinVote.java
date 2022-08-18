package com.bezkoder.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BulletinVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private String codeVote;
    private Boolean hasVoted;

    //Relation avec users
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="userId",referencedColumnName = "id" , insertable = false, updatable = false)
    private UserDetail userDetail;
    private Long userId;




}
